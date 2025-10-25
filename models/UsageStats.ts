/**
 * Usage Stats Model
 * Tracks user usage of jobs and chat features per month
 */

import mongoose, { Schema, Model } from 'mongoose';
import { IUsageStats } from '@/types/subscription';

const usageStatsSchema = new Schema<IUsageStats>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Current month tracking
    currentMonth: {
      type: String,
      required: true,
    },
    jobsCreated: {
      type: Number,
      required: true,
      default: 0,
    },
    chatMessages: {
      type: Number,
      required: true,
      default: 0,
    },

    // Historical monthly data
    monthlyStats: [
      {
        month: {
          type: String,
          required: true,
        },
        jobsCreated: {
          type: Number,
          default: 0,
        },
        chatMessages: {
          type: Number,
          default: 0,
        },
      },
    ],

    lastResetDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
usageStatsSchema.index({ userId: 1 });
usageStatsSchema.index({ currentMonth: 1 });

// Helper to get current month in YYYY-MM format
function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

// Instance methods
usageStatsSchema.methods.resetIfNeeded = function (): boolean {
  const currentMonth = getCurrentMonth();

  if (this.currentMonth !== currentMonth) {
    // Archive current month's stats
    if (this.jobsCreated > 0 || this.chatMessages > 0) {
      this.monthlyStats.push({
        month: this.currentMonth,
        jobsCreated: this.jobsCreated,
        chatMessages: this.chatMessages,
      });

      // Keep only last 12 months of history
      if (this.monthlyStats.length > 12) {
        this.monthlyStats = this.monthlyStats.slice(-12);
      }
    }

    // Reset for new month
    this.currentMonth = currentMonth;
    this.jobsCreated = 0;
    this.chatMessages = 0;
    this.lastResetDate = new Date();

    return true;
  }

  return false;
};

usageStatsSchema.methods.incrementJobs = async function (
  count: number = 1
): Promise<void> {
  this.resetIfNeeded();
  this.jobsCreated += count;
  await this.save();
};

usageStatsSchema.methods.incrementChat = async function (
  count: number = 1
): Promise<void> {
  this.resetIfNeeded();
  this.chatMessages += count;
  await this.save();
};

usageStatsSchema.methods.getCurrentUsage = function (): {
  jobsCreated: number;
  chatMessages: number;
} {
  this.resetIfNeeded();
  return {
    jobsCreated: this.jobsCreated,
    chatMessages: this.chatMessages,
  };
};

// Static methods
usageStatsSchema.statics.getOrCreateStats = async function (
  userId: string
): Promise<IUsageStats> {
  let stats = await this.findOne({ userId });

  if (!stats) {
    stats = await this.create({
      userId,
      currentMonth: getCurrentMonth(),
      jobsCreated: 0,
      chatMessages: 0,
      monthlyStats: [],
      lastResetDate: new Date(),
    });
  } else {
    // Check if reset is needed
    const wasReset = stats.resetIfNeeded();
    if (wasReset) {
      await stats.save();
    }
  }

  return stats;
};

usageStatsSchema.statics.recordJobCreation = async function (
  userId: string,
  count: number = 1
): Promise<IUsageStats> {
  const stats = await this.getOrCreateStats(userId);
  await stats.incrementJobs(count);
  return stats;
};

usageStatsSchema.statics.recordChatMessage = async function (
  userId: string,
  count: number = 1
): Promise<IUsageStats> {
  const stats = await this.getOrCreateStats(userId);
  await stats.incrementChat(count);
  return stats;
};

usageStatsSchema.statics.getUserUsage = async function (userId: string): Promise<{
  jobsCreated: number;
  chatMessages: number;
}> {
  const stats = await this.getOrCreateStats(userId);
  return stats.getCurrentUsage();
};

// Prevent duplicate models in development
const UsageStats: Model<IUsageStats> =
  mongoose.models.UsageStats ||
  mongoose.model<IUsageStats>('UsageStats', usageStatsSchema);

export default UsageStats;
