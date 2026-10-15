import * as React from 'react';
/** Dense pricing feature-comparison table: 16px cells, hairline row rules, success checks. */
export interface ComparisonRow { label?: string; values?: (boolean | string)[]; group?: string; }
export interface ComparisonTableProps { tiers: string[]; rows: ComparisonRow[]; featured?: string; style?: React.CSSProperties; }
export function ComparisonTable(props: ComparisonTableProps): JSX.Element;
