import * as React from 'react';
/** IBM Plex Mono label that sits above display headlines. Mono is labels only. */
export interface EyebrowProps { children?: React.ReactNode; tone?: 'dark' | 'light'; caps?: boolean; style?: React.CSSProperties; }
export function Eyebrow(props: EyebrowProps): JSX.Element;
