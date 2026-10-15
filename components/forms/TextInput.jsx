import React from 'react';
export function TextInput({ tone='light', label, required, error, style, ...rest }) {
  const dark = tone==='dark';
  const input = <input className="sn-input" style={{ boxSizing:'border-box', width:'100%', height:'var(--control-lg)', padding:'0 var(--space-md)', borderRadius:'var(--radius-app-xs)', font:'var(--t-body)', background: dark ? 'var(--canvas)' : 'var(--canvas-light)', color: dark ? 'var(--ash)' : 'var(--ink)', border: `1px solid ${error ? 'var(--error)' : dark ? 'var(--ink-soft)' : 'var(--hairline)'}`, ...style }} {...rest} />;
  if (!label && !error) return input;
  return <label style={{ display:'flex', flexDirection:'column', gap:6 }}>
    {label && <span style={{ font:'var(--t-caption-tight)', color: dark ? 'var(--on-primary)' : 'var(--ink)' }}>{label}{required && <span style={{ color:'var(--error)' }}> *</span>}</span>}
    {input}
    {error && <span style={{ font:'var(--t-meta)', color:'var(--error)' }}>{error}</span>}
  </label>;
}
export function Textarea({ tone='dark', rows=4, style, ...rest }) {
  const dark = tone==='dark';
  return <textarea className="sn-input" rows={rows} style={{ boxSizing:'border-box', width:'100%', padding:'var(--space-xs) var(--space-sm)', borderRadius:'var(--radius-app-xs)', font:'var(--t-body)', resize:'vertical', background: dark ? 'var(--canvas)' : 'var(--canvas-light)', color: dark ? 'var(--ash)' : 'var(--ink)', border: `1px solid ${dark ? 'var(--ink-soft)' : 'var(--hairline)'}`, ...style }} {...rest} />;
}
