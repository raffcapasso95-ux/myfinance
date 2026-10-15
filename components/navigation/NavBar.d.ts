import * as React from 'react';
/**
 * Persistent dark top bar: wordmark left, centred menu, sign-in + demo + primary CTA right. No bottom border.
 * @startingPoint section="Navigation" subtitle="Dark marketing nav bar" viewport="1280x64"
 */
export interface NavBarProps { links?: string[]; active?: string; onNavigate?: (link: string) => void; style?: React.CSSProperties; }
export function NavBar(props: NavBarProps): JSX.Element;
