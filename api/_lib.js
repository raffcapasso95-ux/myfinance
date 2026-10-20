// Shared helpers for Myfinance API (not a route: files starting with _ are ignored by Vercel).
// Env vars on Vercel: ADMIN_EMAIL, ADMIN_PASSWORD + Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN
// or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). SYNC_KEY is optional (old devices, mapped to admin).
const crypto = require('crypto');

const R_URL = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const R_TOK = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const SESSION_TTL = 60 * 60 * 24 * 180;

async function cmd(...args) {
  const r = await fetch(R_URL(), { method: 'POST', headers: { Authorization: `Bearer ${R_TOK()}`, 'content-type': 'application/json' }, body: JSON.stringify(args.map(String)) });
  if (!r.ok) throw new Error('redis ' + r.status);
  return (await r.json()).result;
}

const norm = e => String(e || '').trim().toLowerCase();
const adminEmail = () => norm(process.env.ADMIN_EMAIL);
const configured = () => !!(R_URL() && R_TOK() && adminEmail() && process.env.ADMIN_PASSWORD);
const hashPw = (pw, salt) => crypto.scryptSync(String(pw), salt, 64).toString('hex');
const eq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const newSalt = () => crypto.randomBytes(16).toString('hex');
const readBody = req => { try { return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); } catch (e) { return {}; } };

const userKey = email => 'myfinance:user:' + email;
const dataKey = email => 'myfinance:data:' + email;
async function getUser(email) { const raw = await cmd('GET', userKey(email)); return raw ? JSON.parse(raw) : null; }
async function saveUser(u) { await cmd('SET', userKey(u.email), JSON.stringify(u)); await cmd('SADD', 'myfinance:users', u.email); }

async function session(req) {
  const h = req.headers.authorization || '';
  const t = h.startsWith('Bearer ') ? h.slice(7).trim() : '';
  if (/^[a-f0-9]{64}$/.test(t)) {
    const email = await cmd('GET', 'myfinance:session:' + t);
    if (email) { cmd('EXPIRE', 'myfinance:session:' + t, SESSION_TTL).catch(() => {}); return { email, token: t, admin: email === adminEmail() }; }
  }
  const k = req.headers['x-sync-key'];
  if (k && process.env.SYNC_KEY && eq(k, process.env.SYNC_KEY)) return { email: adminEmail(), admin: true };
  return null;
}

module.exports = { crypto, cmd, norm, adminEmail, configured, hashPw, eq, newSalt, readBody, getUser, saveUser, session, dataKey, SESSION_TTL };
