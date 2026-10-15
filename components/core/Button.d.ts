import * as React from 'react';
/**
 * Saniti button. Pills for marketing CTAs, 4–5px radii for product/app actions.
 * @startingPoint section="Core" subtitle="Marketing and app buttons" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = white pill on dark; primary-on-light = black pill; brand = coral (max one per viewport) */
  variant?: 'primary' | 'primary-on-light' | 'brand' | 'secondary-dark' | 'ghost-dark' | 'app-tab';
  /** app-tab only: selected state */
  active?: boolean;
  /** render as <a> */
  href?: string;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
