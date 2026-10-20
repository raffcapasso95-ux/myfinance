// Admin only: list, create, reset password, delete users.
const L = require('./_lib');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!L.configured()) return res.status(500).json({ error: 'not_configured' });
  try {
    const s = await L.session(req);
    if (!s) return res.status(401).json({ error: 'unauthorized' });
    if (!s.admin) return res.status(403).json({ error: 'forbidden' });

    if (req.method === 'GET') {
      const emails = (await L.cmd('SMEMBERS', 'myfinance:users')) || [];
      const users = (await Promise.all(emails.filter(e => e !== L.adminEmail()).map(L.getUser))).filter(Boolean)
        .map(u => ({ email: u.email, name: u.name || '', createdAt: u.createdAt || 0 })).sort((a, b) => a.createdAt - b.createdAt);
      return res.status(200).json({ users });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
    const b = L.readBody(req), email = L.norm(b.email);
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'bad_email' });
    if (email === L.adminEmail()) return res.status(400).json({ error: 'is_admin' });
    const u = await L.getUser(email);

    if (b.action === 'create' || b.action === 'reset') {
      const pw = String(b.password || '');
      if (pw.length < 8) return res.status(400).json({ error: 'weak' });
      if (b.action === 'create' && u) return res.status(409).json({ error: 'exists' });
      if (b.action === 'reset' && !u) return res.status(404).json({ error: 'not_found' });
      const salt = L.newSalt();
      await L.saveUser({ ...(u || { email, createdAt: Date.now() }), name: String(b.name || (u && u.name) || '').slice(0, 60), salt, hash: L.hashPw(pw, salt) });
      return res.status(200).json({ ok: true });
    }
    if (b.action === 'delete') {
      await L.cmd('DEL', 'myfinance:user:' + email);
      await L.cmd('DEL', L.dataKey(email));
      await L.cmd('SREM', 'myfinance:users', email);
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ error: 'bad_request' });
  } catch (e) {
    return res.status(502).json({ error: 'storage_error' });
  }
};
