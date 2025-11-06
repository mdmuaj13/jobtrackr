"use client"

import { useApi, apiCall } from '@/lib/api';
import { PricingTier } from '@/types/subscription';

export interface SubscriptionData {
  subscription: {
    _id: string;
    tier: PricingTier;
    status: string;
    startDate: string;
    endDate?: string;
    paymentMethod: string;
  };
  usage: {
    userId: string;
    currentMonth: string;
    jobsCreated: number;
    chatMessages: number;
    monthlyStats: Array<{
      month: string;
      jobsCreated: number;
      chatMessages: number;
    }>;
  };
  tier: PricingTier;
  config: {
    tier: PricingTier;
    name: string;
    description: string;
    price: number;
    currency: string;
    billingPeriod: string;
    features: {
      jobsPerMonth: number | 'unlimited';
      chatMessagesPerMonth: number | 'unlimited';
      chatAccess: boolean;
      calendarAccess: boolean;
      companiesAccess: boolean;
      vendorsAccess: boolean;
      testsAccess: boolean;
      dashboardAccess: boolean;
      exportData: boolean;
      prioritySupport: boolean;
    };
    highlighted?: boolean;
  };
}

export interface SubscriptionCheckResult {
  allowed: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number | 'unlimited';
  tier: PricingTier;
}

/**
 * Hook to get current user's subscription with usage stats
 */
export const useSubscription = () => {
  return useApi<{ data: SubscriptionData }>('/api/subscription');
};

/**
 * Hook to get usage statistics
 */
export const useUsageStats = () => {
  return useApi('/api/subscription/usage');
};

/**
 * Check if user can perform a specific action
 */
export const checkSubscriptionAction = async (
  action: 'create_job' | 'access_chat' | 'send_chat_message'
): Promise<SubscriptionCheckResult> => {
  return apiCall('/api/subscription/check', {
    method: 'POST',
    body: JSON.stringify({ action }),
  });
};

/**
 * Cancel current subscription
 */
export const cancelSubscription = async () => {
  return apiCall('/api/subscription/cancel', {
    method: 'POST',
  });
};

/**
 * Update subscription (admin only)
 */
export const updateSubscription = async (data: {
  userId: string;
  tier: PricingTier;
  durationMonths?: number;
  adminNotes?: string;
}) => {
  return apiCall('/api/subscription', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
