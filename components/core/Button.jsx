import React from 'react';
const base = { font:'var(--t-button-sm)', letterSpacing:'var(--t-button-sm-ls)', padding:'0 var(--space-sm)' };
const VARIANTS = {
  primary:{ background:'var(--canvas-light)', color:'var(--ink)', borderColor:'var(--ink)', borderRadius:'var(--radius-full)', height:'var(--control-lg)', font:'var(--t-button-lg)', padding:'0 var(--space-lg)' },
  'primary-on-light':{ background:'var(--ink)', color:'var(--on-primary)', borderColor:'var(--ink)', borderRadius:'var(--radius-full)', height:'var(--control-lg)', font:'var(--t-button-lg)', padding:'0 var(--space-lg)' },
  brand:{ background:'var(--brand)', color:'var(--ink)', borderRadius:'var(--radius-full)', height:'var(--control-lg)', font:'var(--t-button-lg)', padding:'0 var(--space-lg)' },
  'secondary-dark':{ ...base, background:'var(--canvas-soft)', color:'var(--ash)', borderColor:'var(--hairline-soft)', borderRadius:'var(--radius-app-md)', height:'var(--control-md)' },
  'ghost-dark':{ ...base, background:'transparent', color:'var(--ash)', borderRadius:'var(--radius-full)', height:'var(--control-md)' },
  'app-tab':{ background:'var(--canvas-soft)', color:'var(--ash)', borderRadius:'var(--radius-app-sm)', height:'var(--control-sm)', font:'var(--t-button-uppercase)', textTransform:'uppercase', letterSpacing:'0.04em', padding:'0 var(--space-xs)' },
};
export function Button({ variant='primary', active, href, children, style, className='', ...rest }) {
  const s = { ...VARIANTS[variant], ...style };
  const cls = `sn-btn sn-btn--${variant} ${className}`;
  if (href) return <a href={href} className={cls} style={s} {...rest}>{children}</a>;
  return <button type="button" className={cls} style={s} aria-pressed={variant==='app-tab' ? !!active : undefined} {...rest}>{children}</button>;
}
