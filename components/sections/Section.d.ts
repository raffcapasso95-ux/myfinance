import * as React from 'react';
/**
 * Full-width polarity band (96px vertical). Alternate dark/light with a hard cut — no transitional surface.
 * @startingPoint section="Sections" subtitle="Dark/light/paper section bands with headline lockup" viewport="1000x420"
 */
export interface SectionProps { polarity?: 'dark' | 'light' | 'paper'; compact?: boolean; children?: React.ReactNode; style?: React.CSSProperties; innerStyle?: React.CSSProperties; }
export function Section(props: SectionProps): JSX.Element;
/** Mono eyebrow above an editorial display headline, optional subtitle lead. */
export interface DisplayLockupProps { eyebrow?: React.ReactNode; title: React.ReactNode; size?: 'mega' | 'xl' | 'lg' | 'md' | 'sm'; lead?: React.ReactNode; tone?: 'dark' | 'light'; style?: React.CSSProperties; }
export function DisplayLockup(props: DisplayLockupProps): JSX.Element;
