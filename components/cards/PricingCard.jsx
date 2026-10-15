import React from 'react';
import { Button } from '../core/Button.jsx';
export function PricingCard({ name, description, price, period, cta='Get started', features=[], featured=false, onCta, style }) {
  const fg = featured ? 'var(--on-primary)' : 'var(--ink)';
  const sub = featured ? 'var(--ash)' : 'var(--ink-soft)';
  return <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-lg)', padding:'var(--space-xl)', borderRadius:'var(--radius-marketing)', background: featured ? 'var(--ink)' : 'var(--canvas-light)', color:fg, border: `1px solid ${featured ? 'var(--ink)' : 'var(--hairline)'}`, boxSizing:'border-box', ...style }}>
    <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-xs)' }}>
      <div style={{ font:'var(--t-heading-md)', letterSpacing:'var(--t-heading-md-ls)' }}>{name}</div>
      <div style={{ font:'var(--t-body)', color:sub, minHeight:48 }}>{description}</div>
    </div>
    <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
      <span style={{ font:'var(--t-display-md)', letterSpacing:'var(--t-display-md-ls)' }}>{price}</span>
      {period && <span style={{ font:'var(--t-caption)', color:sub }}>{period}</span>}
    </div>
    <Button variant={featured ? 'primary' : 'primary-on-light'} onClick={onCta} style={{ width:'100%' }}>{cta}</Button>
    <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:10 }}>
      {features.map((f,i) => <li key={i} style={{ display:'flex', gap:10, font:'var(--t-body-sm)', letterSpacing:'var(--t-body-sm-ls)', color:sub }}>
        <span style={{ color:'var(--success)', flex:'none' }}>✓</span><span>{f}</span></li>)}
    </ul>
  </div>;
}
