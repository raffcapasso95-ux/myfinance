import * as React from 'react';
/**
 * Framed app-window mockup (6px radius, macOS chrome dots). Wrap product screenshots / Studio UI in this.
 * @startingPoint section="Cards" subtitle="Studio app-window frame" viewport="700x320"
 */
export interface StudioWindowProps { title?: string; children?: React.ReactNode; style?: React.CSSProperties; bodyStyle?: React.CSSProperties; }
export function StudioWindow(props: StudioWindowProps): JSX.Element;
