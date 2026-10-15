import * as React from 'react';
/**
 * Marketing feature card: eyebrow → heading-sm title → body → optional action. 12px radius, 32px padding.
 * @startingPoint section="Cards" subtitle="Dark, brand and light feature cards" viewport="700x320"
 */
export interface FeatureCardProps {
  /** brand = coral fill, at most once per page */
  tone?: 'dark' | 'brand' | 'light';
  eyebrow?: React.ReactNode; title?: React.ReactNode; children?: React.ReactNode;
  action?: React.ReactNode; media?: React.ReactNode; style?: React.CSSProperties;
}
export function FeatureCard(props: FeatureCardProps): JSX.Element;
