/**
 * Subscription Service
 * Handles subscription checks, limits enforcement, and usage tracking
 */

import Subscription from '@/models/Subscription';
import UsageStats from '@/models/UsageStats';
import {
  PricingTier,
  SubscriptionCheckResult,
  ISubscription,
  IUsageStats,
} from '@/types/subscription';
import { getResourceLimit, getPricingConfig } from './pricing-config';
import connectDB from './db';

export class SubscriptionService {
  /**
   * Get user's active subscription
   */
  static async getUserSubscription(userId: string): Promise<ISubscription | null> {
    await connectDB();
    return await Subscription.getActiveSubscription(userId);
  }

  /**
   * Get user's current pricing tier
   */
  static async getUserTier(userId: string): Promise<PricingTier> {
    await connectDB();
    const subscription = await this.getUserSubscription(userId);
    return subscription?.tier || PricingTier.FREE;
  }

  /**
   * Get user's usage statistics
   */
  static async getUserUsage(userId: string): Promise<IUsageStats> {
    await connectDB();
    return await UsageStats.getOrCreateStats(userId);
  }

  /**
   * Check if user can create a job
   */
  static async canCreateJob(userId: string): Promise<SubscriptionCheckResult> {
    await connectDB();

    const tier = await this.getUserTier(userId);
    const limit = getResourceLimit(tier, 'jobs');

    // Unlimited access
    if (limit === 'unlimited') {
      return {
        allowed: true,
        tier,
        limit,
      };
    }

    // Check current usage
    const usage = await this.getUserUsage(userId);
    const currentUsage = usage.jobsCreated;

    if (currentUsage >= limit) {
      return {
        allowed: false,
        reason: `You've reached your monthly limit of ${limit} jobs. Upgrade to Pro for unlimited jobs.`,
        currentUsage,
        limit,
        tier,
      };
    }

    return {
      allowed: true,
      currentUsage,
      limit,
      tier,
    };
  }

  /**
   * Check if user can access chat feature
   * Note: All tiers now have chat access, but with different message limits
   */
  static async canAccessChat(userId: string): Promise<SubscriptionCheckResult> {
    await connectDB();

    const tier = await this.getUserTier(userId);
    const config = getPricingConfig(tier);

    if (!config.features.chatAccess) {
      return {
        allowed: false,
        reason: 'Chat is not available on your current plan.',
        tier,
      };
    }

    return {
      allowed: true,
      tier,
    };
  }

  /**
   * Check if user can send a chat message
   */
  static async canSendChatMessage(userId: string): Promise<SubscriptionCheckResult> {
    await connectDB();

    // First check if user has chat access
    const chatAccess = await this.canAccessChat(userId);
    if (!chatAccess.allowed) {
      return chatAccess;
    }

    const tier = await this.getUserTier(userId);
    const limit = getResourceLimit(tier, 'chat');

    // Unlimited messages
    if (limit === 'unlimited') {
      return {
        allowed: true,
        tier,
        limit,
      };
    }

    // Check current usage
    const usage = await this.getUserUsage(userId);
    const currentUsage = usage.chatMessages;

    if (currentUsage >= limit) {
      return {
        allowed: false,
        reason: `You've reached your monthly limit of ${limit} chat messages. Upgrade to a higher tier for more messages.`,
        currentUsage,
        limit,
        tier,
      };
    }

    return {
      allowed: true,
      currentUsage,
      limit,
      tier,
    };
  }

  /**
   * Record a job creation
   */
  static async recordJobCreation(userId: string): Promise<void> {
    await connectDB();
    await UsageStats.recordJobCreation(userId, 1);
  }

  /**
   * Record a chat message
   */
  static async recordChatMessage(userId: string): Promise<void> {
    await connectDB();
    await UsageStats.recordChatMessage(userId, 1);
  }

  /**
   * Create or update subscription
   */
  static async createOrUpdateSubscription(
    userId: string,
    tier: PricingTier,
    options: {
      paymentMethod?: 'manual' | 'online';
      durationMonths?: number;
      adminNotes?: string;
      createdBy?: string;
    } = {}
  ): Promise<ISubscription> {
    await connectDB();

    const {
      paymentMethod = 'manual',
      durationMonths = 1,
      adminNotes,
      createdBy,
    } = options;

    // Check for existing active subscription
    let subscription = await Subscription.findOne({ userId });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    if (subscription) {
      // Update existing subscription
      subscription.tier = tier;
      subscription.status = 'active';
      subscription.paymentMethod = paymentMethod;
      subscription.startDate = startDate;
      subscription.endDate = tier === PricingTier.FREE ? undefined : endDate;
      subscription.cancelledAt = undefined;

      if (adminNotes) {
        subscription.adminNotes = adminNotes;
      }
      if (createdBy) {
        subscription.createdBy = createdBy;
      }

      await subscription.save();
    } else {
      // Create new subscription
      subscription = await Subscription.create({
        userId,
        tier,
        status: 'active',
        paymentMethod,
        startDate,
        endDate: tier === PricingTier.FREE ? undefined : endDate,
        adminNotes,
        createdBy,
      });
    }

    return subscription;
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(userId: string): Promise<ISubscription | null> {
    await connectDB();

    const subscription = await Subscription.findOne({ userId });
    if (!subscription) {
      return null;
    }

    subscription.cancel();
    await subscription.save();

    return subscription;
  }

  /**
   * Get subscription with usage stats
   * Auto-creates free subscription if none exists
   */
  static async getSubscriptionWithUsage(userId: string): Promise<{
    subscription: ISubscription;
    usage: IUsageStats;
    tier: PricingTier;
    config: ReturnType<typeof getPricingConfig>;
  }> {
    await connectDB();

    let subscription = await this.getUserSubscription(userId);

    // Auto-create free subscription if none exists
    if (!subscription) {
      subscription = await this.initializeFreeSubscription(userId);
    }

    const usage = await this.getUserUsage(userId);
    const tier = subscription.tier;
    const config = getPricingConfig(tier);

    return {
      subscription,
      usage,
      tier,
      config,
    };
  }

  /**
   * Initialize free subscription for new user
   */
  static async initializeFreeSubscription(userId: string): Promise<ISubscription> {
    await connectDB();
    return await Subscription.createFreeSubscription(userId);
  }
}
