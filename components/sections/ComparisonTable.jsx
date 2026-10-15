import React from 'react';
export function ComparisonTable({ tiers=[], rows=[], featured, style }) {
  const cell = v => v===true ? <span style={{ color:'var(--success)' }}>✓</span> : v===false ? <span style={{ color:'var(--ash)' }}>—</span> : v;
  return <table style={{ width:'100%', borderCollapse:'collapse', background:'var(--canvas-light)', color:'var(--ink)', font:'var(--t-body-sm)', letterSpacing:'var(--t-body-sm-ls)', ...style }}>
    <thead><tr>
      <th style={{ textAlign:'left', padding:'var(--space-md)', borderBottom:'1px solid var(--ink)' }}></th>
      {tiers.map(t => <th key={t} style={{ textAlign:'center', padding:'var(--space-md)', font:'var(--t-heading-sm)', borderBottom:'1px solid var(--ink)', fontWeight:400 }}>{t}</th>)}
    </tr></thead>
    <tbody>{rows.map((r,i) => r.group
      ? <tr key={i}><td colSpan={tiers.length+1} style={{ padding:'var(--space-xl) var(--space-md) var(--space-xs)', font:'var(--t-mono-caps)', textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--mute)', borderBottom:'1px solid var(--hairline)' }}>{r.group}</td></tr>
      : <tr key={i}>
        <td style={{ padding:'var(--space-md)', borderBottom:'1px solid var(--hairline)' }}>{r.label}</td>
        {r.values.map((v,j) => <td key={j} style={{ textAlign:'center', padding:'var(--space-md)', borderBottom:'1px solid var(--hairline)', background: tiers[j]===featured ? 'var(--canvas-paper)' : undefined }}>{cell(v)}</td>)}
      </tr>)}</tbody>
  </table>;
}
