// Richieste di informazioni dal sito pubblico (modulo "Richiedi informazioni").
// POST  -> valida, salva in Redis e (se RESEND_API_KEY e' impostata) inoltra via email a REQUEST_TO.
// GET   -> solo admin: elenca le ultime richieste salvate.
// Env opzionali su Vercel: RESEND_API_KEY, REQUEST_TO (default: raffcapasso95@gmail.com), REQUEST_FROM.
// Protezioni: stesso sito (Origin/Referer), campo trappola, tempo minimo di compilazione,
// limite per IP (5 all'ora), lunghezze massime, nessun dato personale nei log.
const L = require('./_lib');

const TO = () => process.env.REQUEST_TO || 'raffcapasso95@gmail.com';
const FROM = () => process.env.REQUEST_FROM || 'Myfinance <onboarding@resend.dev>';
const hasRedis = () => !!((process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) && (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN));
const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(new RegExp('[\\r\\n\\u2028\\u2029]+', 'g'), ' ');
const EMAIL = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,190}\.[^\s@<>"]{2,}$/;
const MIN_FILL_MS = 3000, MAX_PER_HOUR = 5, LIST_KEY = 'myfinance:requests';

const ipOf = req => String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '').split(',')[0].trim() || 'unknown';
const sameSite = req => {
  const o = req.headers.origin || req.headers.referer; if (!o) return true;
  try { return new URL(o).host === req.headers.host; } catch (e) { return false; }
};

async function sendMail(r) {
  const key = process.env.RESEND_API_KEY; if (!key) return false;
  const text = `Nuova richiesta dal sito Myfinance\n\nNome: ${r.name}\nEmail: ${r.email}\nRicevuta: ${r.at}\n\nMessaggio:\n${r.message}\n`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: 'Bearer ' + key, 'content-type': 'application/json' },
    body: JSON.stringify({ from: FROM(), to: [TO()], reply_to: r.email, subject: oneLine('Myfinance · richiesta da ' + r.name, 120), text }),
  });
  return res.ok;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      if (!hasRedis() || !L.configured()) return res.status(500).json({ error: 'not_configured' });
      const s = await L.session(req); if (!s) return res.status(401).json({ error: 'unauthorized' });
      if (!s.admin) return res.status(403).json({ error: 'forbidden' });
      const rows = await L.cmd('LRANGE', LIST_KEY, 0, 99);
      return res.status(200).json({ requests: (rows || []).map(x => { try { return JSON.parse(x); } catch (e) { return null; } }).filter(Boolean) });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
    if (!sameSite(req)) return res.status(403).json({ error: 'forbidden' });
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    if (raw.length > 12000) return res.status(413).json({ error: 'too_large' });
    const b = L.readBody(req);

    // campo trappola e compilazione troppo veloce: rispondo ok senza fare nulla
    const t = Number(b.t);
    if (clean(b.website, 200)) return res.status(200).json({ ok: true });
    if (!Number.isFinite(t) || t <= 0) return res.status(400).json({ error: 'invalid' });
    if (Date.now() - t < MIN_FILL_MS) return res.status(200).json({ ok: true });

    const name = oneLine(b.name, 80), email = oneLine(b.email, 254).toLowerCase(), message = clean(b.message, 2000);
    if (!name) return res.status(400).json({ error: 'invalid', field: 'name' });
    if (!EMAIL.test(email)) return res.status(400).json({ error: 'invalid', field: 'email' });
    if (message.length < 5) return res.status(400).json({ error: 'invalid', field: 'message' });
    if (b.consent !== true) return res.status(400).json({ error: 'invalid', field: 'consent' });

    const redis = hasRedis();
    if (redis) {
      try {
        const k = 'myfinance:rl:request:' + L.crypto.createHash('sha256').update(ipOf(req)).digest('hex').slice(0, 24);
        const n = Number(await L.cmd('INCR', k));
        if (n === 1) await L.cmd('EXPIRE', k, 3600);
        if (n > MAX_PER_HOUR) return res.status(429).json({ error: 'too_many' });
      } catch (e) { /* se il contatore non risponde non blocco una richiesta vera */ }
    }
    const rec = { id: L.crypto.randomBytes(8).toString('hex'), at: new Date().toISOString(), name, email, message };
    let saved = false, mailed = false;
    if (redis) { try { await L.cmd('LPUSH', LIST_KEY, JSON.stringify(rec)); await L.cmd('LTRIM', LIST_KEY, 0, 499); saved = true; } catch (e) {} }
    try { mailed = await sendMail(rec); } catch (e) {}
    if (!saved && !mailed) return res.status(500).json({ error: 'not_configured' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ error: 'server_error' });
  }
};
