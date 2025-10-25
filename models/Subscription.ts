/**
 * Subscription Model
 * Manages user subscription tiers and billing
 */

import mongoose, { Schema, Model } from 'mongoose';
import {
  ISubscription,
  PricingTier,
  SubscriptionStatus,
  PaymentMethod,
} from '@/types/subscription';

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    tier: {
      type: String,
      enum: Object.values(PricingTier),
      required: true,
      default: PricingTier.FREE,
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      required: true,
      default: SubscriptionStatus.ACTIVE,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
      default: PaymentMethod.NONE,
    },

    // Dates
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },

    // Payment info (for future Stripe integration)
    stripeCustomerId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    lastPaymentDate: {
      type: Date,
    },
    nextPaymentDate: {
      type: Date,
    },

    // Admin management
    adminNotes: {
      type: String,
    },
    createdBy: {
      type: String, // admin user ID
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
subscriptionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ tier: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ stripeCustomerId: 1 });
subscriptionSchema.index({ stripeSubscriptionId: 1 });

// Instance methods
subscriptionSchema.methods.isActive = function (): boolean {
  if (this.status !== SubscriptionStatus.ACTIVE) {
    return false;
  }

  // Check if subscription has expired
  if (this.endDate && new Date() > this.endDate) {
    return false;
  }

  return true;
};

subscriptionSchema.methods.cancel = function (): void {
  this.status = SubscriptionStatus.CANCELLED;
  this.cancelledAt = new Date();
};

subscriptionSchema.methods.renew = function (months: number = 1): void {
  const now = new Date();
  const endDate = new Date(this.endDate || now);

  // If already expired, start from now
  if (endDate < now) {
    endDate.setTime(now.getTime());
  }

  // Add months
  endDate.setMonth(endDate.getMonth() + months);

  this.endDate = endDate;
  this.status = SubscriptionStatus.ACTIVE;
  this.lastPaymentDate = now;
  this.nextPaymentDate = endDate;
};

// Static methods
subscriptionSchema.statics.getActiveSubscription = async function (
  userId: string
): Promise<ISubscription | null> {
  const subscription = await this.findOne({
    userId,
    status: SubscriptionStatus.ACTIVE,
  }).sort({ createdAt: -1 });

  if (!subscription) {
    return null;
  }

  // Check if expired
  if (subscription.endDate && new Date() > subscription.endDate) {
    subscription.status = SubscriptionStatus.EXPIRED;
    await subscription.save();
    return null;
  }

  return subscription;
};

subscriptionSchema.statics.getUserTier = async function (
  userId: string
): Promise<PricingTier> {
  const subscription = await this.getActiveSubscription(userId);
  return subscription?.tier || PricingTier.FREE;
};

subscriptionSchema.statics.createFreeSubscription = async function (
  userId: string
): Promise<ISubscription> {
  const existingSubscription = await this.findOne({ userId });

  if (existingSubscription) {
    return existingSubscription;
  }

  const subscription = await this.create({
    userId,
    tier: PricingTier.FREE,
    status: SubscriptionStatus.ACTIVE,
    paymentMethod: PaymentMethod.NONE,
    startDate: new Date(),
  });

  return subscription;
};

// Prevent duplicate models in development
const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;
