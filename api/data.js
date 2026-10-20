// Myfinance cloud sync — one JSON document per user in Upstash Redis.
const L = require('./_lib');
const LEGACY = 'myfinance:data';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!L.configured()) return res.status(500).json({ error: 'not_configured' });
  try {
    const s = await L.session(req);
    if (!s) return res.status(401).json({ error: 'unauthorized' });
    const KEY = L.dataKey(s.email);
    let raw = await L.cmd('GET', KEY);
    if (!raw && s.admin) raw = await L.cmd('GET', LEGACY);
    const current = raw ? JSON.parse(raw) : null;
    if (req.method === 'GET') return res.status(200).json(current || { empty: true });
    if (req.method === 'PUT' || req.method === 'POST') {
      const body = L.readBody(req);
      if (!body || !Array.isArray(body.months) || typeof body.dataAt !== 'number') return res.status(400).json({ error: 'bad_request' });
      if (current && current.dataAt > body.dataAt) return res.status(409).json(current);
      const doc = { dataAt: body.dataAt, months: body.months, rates: body.rates || [], nextId: body.nextId || 1000 };
      await L.cmd('SET', KEY, JSON.stringify(doc));
      return res.status(200).json({ ok: true, dataAt: doc.dataAt });
    }
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    return res.status(502).json({ error: 'storage_error' });
  }
};
