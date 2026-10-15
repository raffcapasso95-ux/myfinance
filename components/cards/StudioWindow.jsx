import React from 'react';
export function StudioWindow({ title, children, style, bodyStyle }) {
  const dot = c => <span style={{ width:10, height:10, borderRadius:99, background:c }} />;
  return <div style={{ background:'var(--canvas-soft)', border:'1px solid var(--hairline-soft)', borderRadius:'var(--radius-app-lg)', overflow:'hidden', color:'var(--on-primary)', font:'var(--t-body-sm)', ...style }}>
    <div style={{ display:'flex', alignItems:'center', gap:6, height:32, padding:'0 var(--space-sm)', borderBottom:'1px solid var(--hairline-soft)' }}>
      {dot('#ff5f57')}{dot('#febc2e')}{dot('#28c840')}
      {title && <span style={{ marginLeft:'var(--space-sm)', font:'var(--t-mono-micro)', color:'var(--mute)' }}>{title}</span>}
    </div>
    <div style={{ padding:'var(--space-md)', ...bodyStyle }}>{children}</div>
  </div>;
}
