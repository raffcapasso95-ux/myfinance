import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';
const COLS = {
  Product:['Studio','Content Lake','Live preview','Integrations'],
  Solutions:['E-commerce','Media','Marketing sites','Apps'],
  Resources:['Docs','Guides','Templates','Changelog'],
  Customers:['Case studies','Partners','Community'],
  Company:['About','Careers','Contact','Press'],
  Legal:['Privacy','Terms','Security'],
};
export function Footer({ columns=COLS, style }) {
  return <footer style={{ background:'var(--canvas)', color:'var(--on-primary)', padding:'var(--space-section) var(--space-lg)', ...style }}>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'var(--space-xl)' }}>
      {Object.entries(columns).map(([h, items]) => <div key={h} style={{ display:'flex', flexDirection:'column', gap:'var(--space-xs)' }}>
        <div style={{ font:'var(--t-mono-caps)', textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--mute)', marginBottom:'var(--space-xxs)' }}>{h}</div>
        {items.map(i => <a key={i} href="#" className="sn-footlink" style={{ font:'var(--t-caption)' }}>{i}</a>)}
      </div>)}
    </div>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'var(--space-section)', paddingTop:'var(--space-lg)', borderTop:'1px solid var(--hairline-soft)', font:'var(--t-meta)', color:'var(--mute)' }}>
      <span>© 2026 Saniti, Inc.</span>
      <Wordmark />
    </div>
  </footer>;
}
