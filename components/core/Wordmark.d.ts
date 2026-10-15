import * as React from 'react';
/** Coral brand dot — always 8px left of the wordmark. */
export interface BrandDotProps { size?: number; style?: React.CSSProperties; }
export function BrandDot(props: BrandDotProps): JSX.Element;
/** Brand dot + "Saniti" wordmark. The system's identification mark (no logo glyph). */
export interface WordmarkProps { size?: number; tone?: 'dark' | 'light'; style?: React.CSSProperties; }
export function Wordmark(props: WordmarkProps): JSX.Element;
