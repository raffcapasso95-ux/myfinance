import React from 'react';
export function AlertBanner({ children, action, style }) {
  return <div role="status" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'var(--space-md)', padding:'var(--space-md)', borderRadius:'var(--radius-app-lg)', background:'var(--surface-blue-bg)', color:'var(--ink)', font:'var(--t-body-sm)', letterSpacing:'var(--t-body-sm-ls)', ...style }}>
    <div>{children}</div>{action}
  </div>;
}
