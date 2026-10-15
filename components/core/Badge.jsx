import React from 'react';
export function Badge({ variant='neutral', children, style }) {
  const filled = variant==='filled';
  return <span style={{ display:'inline-flex', alignItems:'center', height:24, padding:'0 var(--space-xs)', borderRadius:'var(--radius-full)', font:'var(--t-caption)', background: filled ? 'var(--ink)' : 'var(--canvas-light)', color: filled ? 'var(--on-primary)' : 'var(--ink)', border: filled ? '1px solid var(--graphite)' : '1px solid var(--hairline)', whiteSpace:'nowrap', ...style }}>{children}</span>;
}
