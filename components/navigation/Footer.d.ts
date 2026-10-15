import * as React from 'react';
/**
 * Dark footer: 6-column mono-headed link grid, copyright left, wordmark right.
 * @startingPoint section="Navigation" subtitle="Six-column dark footer" viewport="1280x360"
 */
export interface FooterProps { columns?: Record<string, string[]>; style?: React.CSSProperties; }
export function Footer(props: FooterProps): JSX.Element;
