// Login / logout / current user / change password.
const L = require('./_lib');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!L.configured()) return res.status(500).json({ error: 'not_configured' });
  try {
    if (req.method === 'GET') {
      const s = await L.session(req); if (!s) return res.status(401).json({ error: 'unauthorized' });
      const u = await L.getUser(s.email);
      return res.status(200).json({ email: s.email, name: (u && u.name) || '', admin: s.admin });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
    const b = L.readBody(req);

    if (b.action === 'login') {
      const email = L.norm(b.email), pw = String(b.password || '');
      if (!email || !pw) return res.status(400).json({ error: 'bad_request' });
      const fk = 'myfinance:fail:' + email;
      if (+(await L.cmd('GET', fk) || 0) >= 10) return res.status(429).json({ error: 'too_many' });
      const u = await L.getUser(email);
      let ok = !!u && L.eq(L.hashPw(pw, u.salt), u.hash);
      if (!ok && email === L.adminEmail()) ok = L.eq(pw, process.env.ADMIN_PASSWORD);
      if (!ok) { await L.cmd('INCR', fk); await L.cmd('EXPIRE', fk, 900); return res.status(401).json({ error: 'invalid' }); }
      await L.cmd('DEL', fk);
      const token = L.crypto.randomBytes(32).toString('hex');
      await L.cmd('SET', 'myfinance:session:' + token, email, 'EX', L.SESSION_TTL);
      return res.status(200).json({ token, email, name: (u && u.name) || '', admin: email === L.adminEmail() });
    }

    const s = await L.session(req);
    if (!s) return res.status(401).json({ error: 'unauthorized' });

    if (b.action === 'logout') { if (s.token) await L.cmd('DEL', 'myfinance:session:' + s.token); return res.status(200).json({ ok: true }); }

    if (b.action === 'password') {
      const next = String(b.next || ''), cur = String(b.current || '');
      if (next.length < 8) return res.status(400).json({ error: 'weak' });
      const u = await L.getUser(s.email);
      const okCur = (u && L.eq(L.hashPw(cur, u.salt), u.hash)) || (s.admin && L.eq(cur, process.env.ADMIN_PASSWORD));
      if (!okCur) return res.status(403).json({ error: 'wrong_password' });
      const salt = L.newSalt();
      await L.saveUser({ ...(u || { email: s.email, name: '', createdAt: Date.now() }), salt, hash: L.hashPw(next, salt) });
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ error: 'bad_request' });
  } catch (e) {
    return res.status(502).json({ error: 'storage_error' });
  }
};
