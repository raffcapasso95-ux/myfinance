import React from 'react';
export function Eyebrow({ children, tone='dark', caps=false, style }) {
  return <div style={{ font: caps ? 'var(--t-mono-caps)' : 'var(--t-mono-eyebrow)', textTransform: caps ? 'uppercase' : 'none', letterSpacing: caps ? '0.06em' : 0, color: tone==='dark' ? 'var(--ash)' : 'var(--slate-soft)', ...style }}>{children}</div>;
}
