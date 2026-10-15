import React from 'react';
export function BrandDot({ size=12, style }) {
  return <span aria-hidden="true" style={{ display:'inline-block', width:size, height:size, borderRadius:'var(--radius-full)', background:'var(--brand)', flex:'none', ...style }} />;
}
export function Wordmark({ size=18, tone='dark', style }) {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:8, color: tone==='dark' ? 'var(--on-primary)' : 'var(--ink)', ...style }}>
    <BrandDot size={size>24 ? 12 : 10} />
    <span style={{ font:`500 ${size}px/1 var(--font-sans)`, letterSpacing: `${-size*0.02}px` }}>Saniti</span>
  </span>;
}
