import * as React from 'react';
/**
 * Pricing tier card. Featured tier = full ink inversion — never add a "Most popular" ribbon.
 * @startingPoint section="Cards" subtitle="Standard + featured pricing tiers" viewport="700x520"
 */
export interface PricingCardProps {
  name: string; description?: string; price: string; period?: string; cta?: string;
  features?: string[]; featured?: boolean; onCta?: () => void; style?: React.CSSProperties;
}
export function PricingCard(props: PricingCardProps): JSX.Element;
