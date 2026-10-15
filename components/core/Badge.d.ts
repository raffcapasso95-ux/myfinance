import * as React from 'react';
/** Small pill label ("New", "Beta"). */
export interface BadgeProps { variant?: 'neutral' | 'filled'; children?: React.ReactNode; style?: React.CSSProperties; }
export function Badge(props: BadgeProps): JSX.Element;
