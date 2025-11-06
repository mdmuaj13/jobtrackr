/**
 * Frontend Subscription Helper Utilities
 * Client-side utilities for checking subscription limits and access
 */

import { PricingTier } from '@/types/subscription';

/**
 * Check if a tier has a specific feature
 */
export function hasFeature(tier: PricingTier, feature: string): boolean {
  const features: Record<PricingTier, string[]> = {
    [PricingTier.FREE]: [
      'jobTracking',
      'aiChat',
      'calendarAccess',
      'companiesAccess',
      'vendorsAccess',
      'testsAccess',
      'dashboardAccess',
    ],
    [PricingTier.PRO]: [
      'jobTracking',
      'aiChat',
      'calendarAccess',
      'companiesAccess',
      'vendorsAccess',
      'testsAccess',
      'dashboardAccess',
      'unlimitedJobs',
      'exportData',
      'prioritySupport',
      'aiJobEntry',
      'analytics',
      'timeline',
    ],
    [PricingTier.CUSTOM]: [
      'jobTracking',
      'aiChat',
      'calendarAccess',
      'companiesAccess',
      'vendorsAccess',
      'testsAccess',
      'dashboardAccess',
      'unlimitedJobs',
      'exportData',
      'prioritySupport',
      'aiJobEntry',
      'analytics',
      'timeline',
      'customIntegrations',
      'dedicatedSupport',
      'customBranding',
      'apiAccess',
    ],
  };

  return features[tier]?.includes(feature) || false;
}

/**
 * Get tier limits
 */
export function getTierLimits(tier: PricingTier) {
  const limits = {
    [PricingTier.FREE]: {
      jobsPerMonth: 100,
      chatMessagesPerMonth: 20,
      emailNotifications: false,
      documentStorage: false,
    },
    [PricingTier.PRO]: {
      jobsPerMonth: Infinity,
      chatMessagesPerMonth: 1000,
      emailNotifications: true,
      documentStorage: true,
    },
    [PricingTier.CUSTOM]: {
      jobsPerMonth: Infinity,
      chatMessagesPerMonth: Infinity,
      emailNotifications: true,
      documentStorage: true,
    },
  };

  return limits[tier];
}

/**
 * Calculate usage percentage
 */
export function calculateUsagePercentage(
  current: number,
  limit: number | 'unlimited'
): number {
  if (limit === 'unlimited' || limit === Infinity) {
    return 0;
  }
  return Math.min((current / limit) * 100, 100);
}

/**
 * Check if user is approaching limit
 */
export function isApproachingLimit(
  current: number,
  limit: number | 'unlimited',
  threshold: number = 80
): boolean {
  if (limit === 'unlimited' || limit === Infinity) {
    return false;
  }
  const percentage = calculateUsagePercentage(current, limit);
  return percentage >= threshold;
}

/**
 * Check if user has exceeded limit
 */
export function hasExceededLimit(
  current: number,
  limit: number | 'unlimited'
): boolean {
  if (limit === 'unlimited' || limit === Infinity) {
    return false;
  }
  return current >= limit;
}

/**
 * Get upgrade message based on current tier and feature
 */
export function getUpgradeMessage(tier: PricingTier, feature: string): string {
  if (tier === PricingTier.FREE) {
    const messages: Record<string, string> = {
      unlimitedJobs: 'Upgrade to Pro for unlimited job tracking',
      aiJobEntry: 'Upgrade to Pro for AI-powered job entry',
      analytics: 'Upgrade to Pro for advanced analytics dashboard',
      timeline: 'Upgrade to Pro for application timeline visualization',
      exportData: 'Upgrade to Pro to export your data',
      moreChatMessages: 'Upgrade to Pro for 1000 chat messages per month',
    };
    return messages[feature] || 'Upgrade to Pro for more features';
  }

  if (tier === PricingTier.PRO) {
    return 'Contact us for Custom plan with unlimited features';
  }

  return '';
}

/**
 * Format tier name for display
 */
export function formatTierName(tier: PricingTier): string {
  const names = {
    [PricingTier.FREE]: 'Free',
    [PricingTier.PRO]: 'Pro',
    [PricingTier.CUSTOM]: 'Custom',
  };
  return names[tier];
}

/**
 * Get tier badge color
 */
export function getTierBadgeColor(tier: PricingTier): string {
  const colors = {
    [PricingTier.FREE]: 'bg-gray-100 text-gray-800',
    [PricingTier.PRO]: 'bg-blue-100 text-blue-800',
    [PricingTier.CUSTOM]: 'bg-purple-100 text-purple-800',
  };
  return colors[tier];
}

/**
 * Check if tier allows feature
 */
export function canAccessFeature(
  tier: PricingTier,
  feature: keyof ReturnType<typeof getTierLimits>
): boolean {
  const limits = getTierLimits(tier);
  const value = limits[feature];

  if (typeof value === 'boolean') {
    return value;
  }

  return value !== 0;
}
