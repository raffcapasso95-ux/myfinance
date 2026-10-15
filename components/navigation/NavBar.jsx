import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';
import { Button } from '../core/Button.jsx';
const LINKS = ['Product','Solutions','Resources','Customers','Pricing','Docs'];
export function NavBar({ links=LINKS, active, onNavigate, style }) {
  const go = (e, l) => { if (onNavigate) { e.preventDefault(); onNavigate(l); } };
  return <nav style={{ position:'sticky', top:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', gap:'var(--space-lg)', height:'var(--nav-height)', padding:'0 var(--space-lg)', background:'var(--canvas)', color:'var(--on-primary)', ...style }}>
    <a href="#" onClick={e => go(e,'Home')} style={{ textDecoration:'none' }}><Wordmark /></a>
    <div style={{ display:'flex', gap:'var(--space-lg)', overflow:'hidden', minWidth:0 }}>
      {links.map(l => <a key={l} href="#" className="sn-navlink" onClick={e => go(e,l)} style={{ font:'var(--t-button-lg)', padding:'var(--space-xs) 0', color: active===l ? 'var(--ash)' : undefined }}>{l}</a>)}
    </div>
    <div style={{ display:'flex', alignItems:'center', gap:'var(--space-sm)' }}>
      <a href="#" className="sn-navlink" style={{ font:'var(--t-button-sm)', whiteSpace:'nowrap' }}>Sign in</a>
      <Button variant="secondary-dark">Book a demo</Button>
      <Button variant="primary" style={{ height:36, font:'var(--t-button-sm)', padding:'0 var(--space-md)' }}>Get started free</Button>
    </div>
  </nav>;
}
