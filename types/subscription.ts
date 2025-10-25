/**
 * Subscription and Pricing Types
 */

export enum PricingTier {
  FREE = 'free',
  PRO = 'pro',
  CUSTOM = 'custom',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  TRIAL = 'trial',
}

export enum PaymentMethod {
  MANUAL = 'manual',
  ONLINE = 'online',
  NONE = 'none',
}

export interface PricingTierConfig {
  tier: PricingTier;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly' | 'lifetime';
  features: {
    jobsPerMonth: number | 'unlimited';
    chatAccess: boolean;
    chatMessagesPerMonth: number | 'unlimited';
    calendarAccess: boolean;
    companiesAccess: boolean;
    vendorsAccess: boolean;
    testsAccess: boolean;
    dashboardAccess: boolean;
    exportData: boolean;
    prioritySupport: boolean;
    customFeatures?: string[];
  };
  highlighted?: boolean;
}

export interface ISubscription {
  _id: string;
  userId: string;
  tier: PricingTier;
  status: SubscriptionStatus;
  paymentMethod: PaymentMethod;

  // Dates
  startDate: Date;
  endDate?: Date;
  cancelledAt?: Date;

  // Payment info (for future online payments)
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  lastPaymentDate?: Date;
  nextPaymentDate?: Date;

  // Admin notes (for manual subscriptions)
  adminNotes?: string;
  createdBy?: string; // admin user ID who created this subscription

  createdAt: Date;
  updatedAt: Date;
}

export interface IUsageStats {
  _id: string;
  userId: string;

  // Current month stats
  currentMonth: string; // YYYY-MM format
  jobsCreated: number;
  chatMessages: number;

  // Historical data
  monthlyStats: {
    month: string; // YYYY-MM
    jobsCreated: number;
    chatMessages: number;
  }[];

  // Last reset
  lastResetDate: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionCheckResult {
  allowed: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number | 'unlimited';
  tier: PricingTier;
}
