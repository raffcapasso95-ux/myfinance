// Modello HTML dell'email "Nuova richiesta dal sito".
// Layout a tabelle e stili inline (compatibile con Gmail, Outlook, Apple Mail), larghezza 560 px,
// niente immagini remote ne' script. Tutti i valori inseriti dall'utente sono neutralizzati con esc().
const esc = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const SITE = 'https://myfinance-sito.vercel.app';

function dateIt(iso) {
  try { return new Date(iso).toLocaleString('it-IT', { timeZone: 'Europe/Rome', dateStyle: 'full', timeStyle: 'short' }); } catch (e) { return String(iso || ''); }
}

// r = { name, email, message, at, id }
function renderRequestHtml(r) {
  const name = esc(r.name), email = esc(r.email), when = esc(dateIt(r.at));
  const msg = esc(r.message).replace(/\r?\n/g, '<br>');
  const mailto = 'mailto:' + encodeURIComponent(r.email) + '?subject=' + encodeURIComponent('Re: la tua richiesta su Myfinance');
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Nuova richiesta dal sito Myfinance</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f1;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${name} ti ha scritto dal sito Myfinance.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f4f1;">
 <tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:560px;">
   <tr><td style="padding:0 4px 16px 4px;font-family:${font};font-size:18px;line-height:24px;font-weight:700;color:#0b0b0b;letter-spacing:-0.01em;">
     <span style="color:#f36458;">&#9679;</span>&nbsp;Myfinance
   </td></tr>
   <tr><td style="background:#ffffff;border:1px solid #d3d2cc;border-radius:20px;padding:28px 24px;">
     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr><td style="font-family:'Courier New',monospace;font-size:12px;line-height:18px;letter-spacing:.06em;text-transform:uppercase;color:#606060;padding-bottom:6px;">Nuova richiesta dal sito</td></tr>
      <tr><td style="font-family:${font};font-size:26px;line-height:32px;font-weight:700;color:#0b0b0b;letter-spacing:-0.01em;padding-bottom:20px;">${name} ti ha scritto</td></tr>
      <tr><td style="padding-bottom:20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #ebeae6;">
         <tr>
          <td width="96" valign="top" style="font-family:${font};font-size:13px;line-height:20px;color:#606060;padding:12px 0;border-bottom:1px solid #ebeae6;">Nome</td>
          <td valign="top" style="font-family:${font};font-size:15px;line-height:22px;color:#0b0b0b;font-weight:600;padding:12px 0;border-bottom:1px solid #ebeae6;">${name}</td>
         </tr>
         <tr>
          <td width="96" valign="top" style="font-family:${font};font-size:13px;line-height:20px;color:#606060;padding:12px 0;border-bottom:1px solid #ebeae6;">Email</td>
          <td valign="top" style="font-family:${font};font-size:15px;line-height:22px;color:#0b0b0b;padding:12px 0;border-bottom:1px solid #ebeae6;"><a href="${mailto}" style="color:#b7352c;text-decoration:underline;">${email}</a></td>
         </tr>
         <tr>
          <td width="96" valign="top" style="font-family:${font};font-size:13px;line-height:20px;color:#606060;padding:12px 0;border-bottom:1px solid #ebeae6;">Ricevuta</td>
          <td valign="top" style="font-family:${font};font-size:15px;line-height:22px;color:#0b0b0b;padding:12px 0;border-bottom:1px solid #ebeae6;">${when}</td>
         </tr>
        </table>
      </td></tr>
      <tr><td style="font-family:'Courier New',monospace;font-size:12px;line-height:18px;letter-spacing:.06em;text-transform:uppercase;color:#606060;padding-bottom:8px;">Messaggio</td></tr>
      <tr><td style="background:#f4f4f1;border-radius:14px;padding:16px 18px;font-family:${font};font-size:16px;line-height:25px;color:#0b0b0b;">${msg}</td></tr>
      <tr><td style="padding-top:24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
         <td align="center" bgcolor="#f36458" style="border-radius:99px;">
          <a href="${mailto}" style="display:inline-block;padding:14px 26px;font-family:${font};font-size:16px;line-height:20px;font-weight:700;color:#0b0b0b;text-decoration:none;border-radius:99px;">Rispondi a ${name}</a>
         </td>
        </tr></table>
      </td></tr>
     </table>
   </td></tr>
   <tr><td style="padding:16px 8px 0 8px;font-family:${font};font-size:12px;line-height:18px;color:#606060;text-align:center;">
     Email generata dal modulo di <a href="${SITE}" style="color:#606060;text-decoration:underline;">Myfinance</a>. Puoi anche rispondere direttamente a questo messaggio: arriver&agrave; a ${email}.
   </td></tr>
  </table>
 </td></tr>
</table>
</body>
</html>`;
}

function renderRequestText(r) {
  return `Nuova richiesta dal sito Myfinance\n\nNome: ${r.name}\nEmail: ${r.email}\nRicevuta: ${dateIt(r.at)}\n\nMessaggio:\n${r.message}\n\n--\nPuoi rispondere direttamente a questo messaggio: arrivera' a ${r.email}.\n`;
}

module.exports = { renderRequestHtml, renderRequestText, esc };
