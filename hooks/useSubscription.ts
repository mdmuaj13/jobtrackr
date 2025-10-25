/**
 * useSubscription Hook
 * React hook for accessing subscription data and checking limits
 */

import { useEffect, useState, useCallback } from 'react';
import { PricingTier, SubscriptionCheckResult } from '@/types/subscription';

interface SubscriptionData {
  subscription: {
    tier: PricingTier;
    status: string;
    startDate: string;
    endDate?: string;
    paymentMethod: string;
  } | null;
  usage: {
    jobsCreated: number;
    chatMessages: number;
    currentMonth: string;
  };
  tier: PricingTier;
  config: {
    name: string;
    price: number;
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
  };
}

export function useSubscription() {
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.message || 'Failed to fetch subscription');
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError('An error occurred while fetching subscription');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const checkAction = async (
    action: 'create_job' | 'access_chat' | 'send_chat_message'
  ): Promise<SubscriptionCheckResult> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      const result = await response.json();

      if (response.ok) {
        return result.data;
      } else {
        return {
          allowed: false,
          reason: result.message || 'Action not allowed',
          tier: data?.tier || PricingTier.FREE,
        };
      }
    } catch (error) {
      console.error('Error checking action:', error);
      return {
        allowed: false,
        reason: 'An error occurred',
        tier: data?.tier || PricingTier.FREE,
      };
    }
  };

  const canCreateJob = async (): Promise<SubscriptionCheckResult> => {
    return checkAction('create_job');
  };

  const canAccessChat = async (): Promise<SubscriptionCheckResult> => {
    return checkAction('access_chat');
  };

  const canSendChatMessage = async (): Promise<SubscriptionCheckResult> => {
    return checkAction('send_chat_message');
  };

  const refresh = () => {
    setLoading(true);
    fetchSubscription();
  };

  return {
    data,
    loading,
    error,
    canCreateJob,
    canAccessChat,
    canSendChatMessage,
    refresh,
    // Convenience properties
    tier: data?.tier || PricingTier.FREE,
    isPro: data?.tier === PricingTier.PRO,
    isCustom: data?.tier === PricingTier.CUSTOM,
    isFree: data?.tier === PricingTier.FREE,
    usage: data?.usage,
    config: data?.config,
  };
}
