/**
 * Pricing Tier Configuration
 * Central configuration for all pricing tiers and their features
 */

import { PricingTier, PricingTierConfig } from '@/types/subscription';

export const PRICING_TIERS: Record<PricingTier, PricingTierConfig> = {
  [PricingTier.FREE]: {
    tier: PricingTier.FREE,
    name: 'Free',
    description: 'Perfect for getting started with job tracking',
    price: 0,
    currency: 'USD',
    billingPeriod: 'monthly',
    features: {
      jobsPerMonth: 20,
      chatAccess: false,
      chatMessagesPerMonth: 0,
      calendarAccess: true,
      companiesAccess: true,
      vendorsAccess: true,
      testsAccess: true,
      dashboardAccess: true,
      exportData: false,
      prioritySupport: false,
    },
    highlighted: false,
  },

  [PricingTier.PRO]: {
    tier: PricingTier.PRO,
    name: 'Pro',
    description: 'For serious job seekers who want unlimited access',
    price: 9.99,
    currency: 'USD',
    billingPeriod: 'monthly',
    features: {
      jobsPerMonth: 'unlimited',
      chatAccess: true,
      chatMessagesPerMonth: 200,
      calendarAccess: true,
      companiesAccess: true,
      vendorsAccess: true,
      testsAccess: true,
      dashboardAccess: true,
      exportData: true,
      prioritySupport: true,
    },
    highlighted: true,
  },

  [PricingTier.CUSTOM]: {
    tier: PricingTier.CUSTOM,
    name: 'Custom',
    description: 'Tailored solution for your specific needs',
    price: 0, // Custom pricing
    currency: 'USD',
    billingPeriod: 'monthly',
    features: {
      jobsPerMonth: 'unlimited',
      chatAccess: true,
      chatMessagesPerMonth: 'unlimited',
      calendarAccess: true,
      companiesAccess: true,
      vendorsAccess: true,
      testsAccess: true,
      dashboardAccess: true,
      exportData: true,
      prioritySupport: true,
      customFeatures: [
        'Custom integrations',
        'Dedicated support',
        'Custom branding',
        'API access',
      ],
    },
    highlighted: false,
  },
};

/**
 * Get pricing tier configuration
 */
export function getPricingConfig(tier: PricingTier): PricingTierConfig {
  return PRICING_TIERS[tier];
}

/**
 * Get all pricing tiers
 */
export function getAllPricingTiers(): PricingTierConfig[] {
  return Object.values(PRICING_TIERS);
}

/**
 * Check if a feature is available for a tier
 */
export function hasFeatureAccess(
  tier: PricingTier,
  feature: keyof PricingTierConfig['features']
): boolean {
  const config = getPricingConfig(tier);
  const featureValue = config.features[feature];

  if (typeof featureValue === 'boolean') {
    return featureValue;
  }

  return featureValue !== 0;
}

/**
 * Get limit for a specific resource
 */
export function getResourceLimit(
  tier: PricingTier,
  resource: 'jobs' | 'chat'
): number | 'unlimited' {
  const config = getPricingConfig(tier);

  if (resource === 'jobs') {
    return config.features.jobsPerMonth;
  }

  if (resource === 'chat') {
    return config.features.chatMessagesPerMonth;
  }

  return 0;
}
