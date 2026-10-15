import React from 'react';
const T = {
  dark:{ background:'var(--canvas-soft)', color:'var(--on-primary)', border:'1px solid var(--hairline-soft)', body:'var(--ash)', eyebrow:'var(--mute)' },
  brand:{ background:'var(--brand)', color:'var(--ink)', border:'1px solid var(--brand)', body:'var(--ink)', eyebrow:'var(--ink)' },
  light:{ background:'var(--canvas-light)', color:'var(--ink)', border:'1px solid var(--hairline)', body:'var(--ink-soft)', eyebrow:'var(--slate-soft)' },
};
export function FeatureCard({ tone='dark', eyebrow, title, children, action, media, style }) {
  const t = T[tone];
  return <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-sm)', padding:'var(--space-xl)', borderRadius:'var(--radius-marketing)', background:t.background, color:t.color, border:t.border, boxSizing:'border-box', ...style }}>
    {media}
    {eyebrow && <div style={{ font:'var(--t-mono-eyebrow)', color:t.eyebrow }}>{eyebrow}</div>}
    {title && <div style={{ font:'var(--t-heading-sm)', letterSpacing:'var(--t-heading-sm-ls)', textWrap:'pretty' }}>{title}</div>}
    {children && <div style={{ font:'var(--t-body)', color:t.body, textWrap:'pretty' }}>{children}</div>}
    {action && <div style={{ marginTop:'var(--space-xs)' }}>{action}</div>}
  </div>;
}
