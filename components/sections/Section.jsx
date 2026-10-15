import React from 'react';
const P = {
  dark:{ background:'var(--canvas)', color:'var(--on-primary)' },
  light:{ background:'var(--canvas-light)', color:'var(--ink)' },
  paper:{ background:'var(--canvas-paper)', color:'var(--ink)' },
};
export function Section({ polarity='dark', compact=false, children, style, innerStyle }) {
  return <section className={polarity==='dark' ? 'sn-dark' : ''} style={{ ...P[polarity], padding: `${compact ? 'var(--space-section)' : 'var(--space-section-lg)'} var(--space-lg)`, ...style }}>
    <div style={{ maxWidth:'var(--container-max)', margin:'0 auto', ...innerStyle }}>{children}</div>
  </section>;
}
export function DisplayLockup({ eyebrow, title, size='md', lead, tone='dark', style }) {
  const t = `display-${size}`;
  return <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-md)', ...style }}>
    {eyebrow && <div style={{ font:'var(--t-mono-eyebrow)', color: tone==='dark' ? 'var(--ash)' : 'var(--slate-soft)' }}>{eyebrow}</div>}
    <h2 style={{ margin:0, font:`var(--t-${t})`, letterSpacing:`var(--t-${t}-ls)`, fontFeatureSettings:'var(--font-display-features)', textWrap:'balance' }}>{title}</h2>
    {lead && <p style={{ margin:0, maxWidth:620, font:'var(--t-subtitle)', letterSpacing:'var(--t-subtitle-ls)', color: tone==='dark' ? 'var(--ash)' : 'var(--ink-soft)', textWrap:'pretty' }}>{lead}</p>}
  </div>;
}
