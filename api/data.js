// Myfinance cloud sync — stores one JSON document in Upstash Redis.
// Required env vars on Vercel: SYNC_KEY (your personal code) + Upstash Redis
// (KV_REST_API_URL / KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
const KEY = 'myfinance:data';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.SYNC_KEY;
  if (!url || !token || !secret) return res.status(500).json({ error: 'not_configured' });
  if ((req.headers['x-sync-key'] || '') !== secret) return res.status(401).json({ error: 'unauthorized' });

  const redis = async (path, body) => {
    const r = await fetch(`${url}/${path}`, { method: body === undefined ? 'GET' : 'POST', headers: { Authorization: `Bearer ${token}` }, body });
    if (!r.ok) throw new Error('redis ' + r.status);
    return (await r.json()).result;
  };

  try {
    const raw = await redis(`get/${KEY}`);
    const current = raw ? JSON.parse(raw) : null;
    if (req.method === 'GET') return res.status(200).json(current || { empty: true });
    if (req.method === 'PUT' || req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || !Array.isArray(body.months) || typeof body.dataAt !== 'number') return res.status(400).json({ error: 'bad_request' });
      if (current && current.dataAt > body.dataAt) return res.status(409).json(current);
      const doc = { dataAt: body.dataAt, months: body.months, rates: body.rates || [], nextId: body.nextId || 1000 };
      await redis(`set/${KEY}`, JSON.stringify(doc));
      return res.status(200).json({ ok: true, dataAt: doc.dataAt });
    }
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    return res.status(502).json({ error: 'storage_error' });
  }
};
