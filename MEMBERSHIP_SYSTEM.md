# Membership & Subscription System

## Overview

JobTrackr implements a freemium subscription model with two main tiers: **Free** and **Pro**. The system includes usage tracking, limit enforcement, and seamless upgrade paths.

## Tier Structure

### Free Tier (Default)

**Limits:**
- Job Tracking: 100 jobs per month
- AI Chat: 20 messages per month

**Features:**
- Manual job entry
- Simple notes per job
- Calendar access
- Company management
- Vendor management
- Test tracking
- Basic dashboard

**Not Included:**
- Email notifications
- Document storage
- Data export
- Advanced analytics
- Priority support

### Pro Tier ($10/month)

**Limits:**
- Job Tracking: Unlimited jobs
- AI Chat: 1000 messages per month

**Features:**
- All Free tier features
- AI-powered job entry from job postings
- Detailed notes and follow-ups per job
- Analytics dashboard with insights
- Application timeline visualization
- Email notifications
- Document storage
- Data export
- Priority support

### Custom Tier

Enterprise-level tier with custom pricing and unlimited everything. Contact-based.

## Architecture

### Database Models

#### Subscription Model (`/models/Subscription.ts`)

Stores user subscription information:

```typescript
{
  userId: string;
  tier: 'free' | 'pro' | 'custom';
  status: 'active' | 'inactive' | 'cancelled' | 'expired' | 'trial';
  paymentMethod: 'manual' | 'online' | 'none';
  startDate: Date;
  endDate?: Date;
  cancelledAt?: Date;
  // Stripe integration fields (for future use)
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}
```

**Methods:**
- `isActive()` - Check if subscription is currently active
- `cancel()` - Cancel the subscription
- `renew(months)` - Renew subscription for specified months
- `getActiveSubscription(userId)` - Get user's active subscription
- `getUserTier(userId)` - Get user's current tier
- `createFreeSubscription(userId)` - Initialize free tier for new users

#### UsageStats Model (`/models/UsageStats.ts`)

Tracks monthly usage for enforcement:

```typescript
{
  userId: string;
  currentMonth: string; // "YYYY-MM"
  jobsCreated: number;
  chatMessages: number;
  monthlyStats: Array<{
    month: string;
    jobsCreated: number;
    chatMessages: number;
  }>;
  lastResetDate: Date;
}
```

**Methods:**
- `resetIfNeeded()` - Auto-reset counters on new month
- `incrementJobs(count)` - Increment job creation counter
- `incrementChat(count)` - Increment chat message counter
- `getCurrentUsage()` - Get current month's usage
- `getOrCreateStats(userId)` - Get or create stats for user
- `recordJobCreation(userId)` - Record a job creation
- `recordChatMessage(userId)` - Record a chat message

### Services

#### SubscriptionService (`/lib/subscription-service.ts`)

Main service for subscription operations:

**Key Methods:**

```typescript
// Check if user can create a job
await SubscriptionService.canCreateJob(userId);
// Returns: { allowed: boolean, reason?: string, currentUsage?: number, limit?: number, tier: string }

// Check if user can send chat message
await SubscriptionService.canSendChatMessage(userId);

// Check if user can access chat feature
await SubscriptionService.canAccessChat(userId);

// Record usage
await SubscriptionService.recordJobCreation(userId);
await SubscriptionService.recordChatMessage(userId);

// Get subscription with usage
await SubscriptionService.getSubscriptionWithUsage(userId);

// Manage subscriptions
await SubscriptionService.createOrUpdateSubscription(userId, tier, options);
await SubscriptionService.cancelSubscription(userId);
```

#### Middleware Helpers (`/lib/subscription-middleware.ts`)

Easy-to-use middleware for API routes:

```typescript
// Check job creation access
const { error, user } = await requireJobCreationAccess(request);
if (error) return error;

// Check chat message access
const { error, user } = await requireChatMessageAccess(request);
if (error) return error;

// Check chat feature access
const { error, user } = await requireChatAccess(request);
if (error) return error;
```

#### Frontend Helpers (`/lib/subscription-helpers.ts`)

Client-side utilities:

```typescript
// Check if tier has feature
hasFeature(tier, 'unlimitedJobs');

// Get tier limits
getTierLimits(tier);

// Calculate usage percentage
calculateUsagePercentage(current, limit);

// Check if approaching limit
isApproachingLimit(current, limit, 80);

// Check if exceeded limit
hasExceededLimit(current, limit);

// Get upgrade message
getUpgradeMessage(tier, 'unlimitedJobs');
```

## API Endpoints

### GET `/api/subscription`

Get current user's subscription with usage stats.

**Response:**
```json
{
  "data": {
    "subscription": { /* subscription object */ },
    "usage": { /* usage stats */ },
    "tier": "free",
    "config": { /* tier configuration */ }
  }
}
```

### POST `/api/subscription`

Create or update subscription (admin/manual management).

**Request:**
```json
{
  "userId": "user_id",
  "tier": "pro",
  "durationMonths": 1,
  "adminNotes": "Manual upgrade"
}
```

### POST `/api/subscription/check`

Check if user can perform specific actions.

**Request:**
```json
{
  "action": "create_job" | "access_chat" | "send_chat_message"
}
```

**Response:**
```json
{
  "data": {
    "allowed": true,
    "currentUsage": 5,
    "limit": 100,
    "tier": "free"
  }
}
```

### GET `/api/subscription/usage`

Get current user's usage statistics.

**Response:**
```json
{
  "data": {
    "userId": "user_id",
    "currentMonth": "2025-11",
    "jobsCreated": 5,
    "chatMessages": 3,
    "monthlyStats": [...]
  }
}
```

### POST `/api/subscription/usage`

Record usage (internal endpoint).

**Request:**
```json
{
  "type": "job" | "chat",
  "count": 1
}
```

### POST `/api/subscription/cancel`

Cancel current user's subscription.

## Implementation Guide

### 1. Protecting API Routes

Example for job creation:

```typescript
// app/api/jobs/route.ts
export async function POST(request: NextRequest) {
  const { error: authError, user } = await authenticateToken(request);
  if (authError) return authError;

  // Check subscription limits
  const canCreate = await SubscriptionService.canCreateJob(user.id);
  if (!canCreate.allowed) {
    return ApiSerializer.error(canCreate.reason, 403);
  }

  // Create job...
  const job = await Job.create({ ... });

  // Record usage
  await SubscriptionService.recordJobCreation(user.id);

  return ApiSerializer.created(job);
}
```

### 2. Frontend Usage Display

```typescript
// components/subscription/usage-badge.tsx
import { useSubscription } from '@/hooks/useSubscription';
import { calculateUsagePercentage, isApproachingLimit } from '@/lib/subscription-helpers';

export function UsageBadge() {
  const { subscription, usage } = useSubscription();
  const config = getPricingConfig(subscription.tier);

  const jobsLimit = config.features.jobsPerMonth;
  const percentage = calculateUsagePercentage(usage.jobsCreated, jobsLimit);
  const isNearLimit = isApproachingLimit(usage.jobsCreated, jobsLimit);

  return (
    <div className={isNearLimit ? 'text-orange-500' : 'text-green-500'}>
      {usage.jobsCreated} / {jobsLimit === 'unlimited' ? '∞' : jobsLimit} jobs
    </div>
  );
}
```

### 3. Chat Message Tracking

When implementing chat features:

```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  const { error, user } = await requireChatMessageAccess(request);
  if (error) return error;

  // Process chat message...
  const response = await processMessage(message);

  // Record usage
  await SubscriptionService.recordChatMessage(user.id);

  return ApiSerializer.success(response);
}
```

### 4. New User Signup

The signup flow automatically creates a free subscription:

```typescript
// app/api/auth/signup/route.ts
const user = await User.create({ ... });

// Create free tier subscription for new user
await SubscriptionService.initializeFreeSubscription(user._id.toString());
```

## Configuration

### Pricing Config (`/lib/pricing-config.ts`)

Central configuration for all tier features and limits:

```typescript
export const PRICING_TIERS = {
  free: {
    tier: 'free',
    name: 'Free',
    price: 0,
    features: {
      jobsPerMonth: 100,
      chatMessagesPerMonth: 20,
      chatAccess: true,
      // ... more features
    }
  },
  pro: {
    tier: 'pro',
    name: 'Pro',
    price: 10,
    features: {
      jobsPerMonth: 'unlimited',
      chatMessagesPerMonth: 1000,
      chatAccess: true,
      exportData: true,
      // ... more features
    }
  }
};
```

## Monthly Reset

Usage counters automatically reset at the start of each month:

- The `UsageStats` model includes a `resetIfNeeded()` method
- Called automatically when accessing stats
- Archives previous month's data to `monthlyStats` array
- Keeps last 12 months of history

## Testing

### Manual Testing

1. **Create a new user** - Should get Free tier
2. **Create jobs** - Counter should increment
3. **Reach limit** - Should get error when trying to create 101st job
4. **Upgrade to Pro** - Should allow unlimited jobs
5. **Send chat messages** - Counter should increment
6. **Check usage** - GET `/api/subscription/usage`

### Testing Limit Enforcement

```bash
# Check if can create job
curl -X POST http://localhost:3000/api/subscription/check \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action": "create_job"}'

# Get usage stats
curl -X GET http://localhost:3000/api/subscription/usage \
  -H "Authorization: Bearer $TOKEN"
```

## Future Enhancements

1. **Stripe Integration** - Online payment processing
2. **Email Notifications** - Usage warnings, renewal reminders
3. **Admin Dashboard** - Manage user subscriptions
4. **Analytics** - Subscription metrics and insights
5. **Promo Codes** - Discount codes and special offers
6. **Team Plans** - Multi-user subscriptions

## Summary

The membership system provides:

- ✅ Two-tier freemium model (Free & Pro)
- ✅ Automatic usage tracking and limit enforcement
- ✅ Monthly usage resets
- ✅ Clean API for subscription checks
- ✅ Middleware helpers for easy integration
- ✅ Frontend utilities for UI components
- ✅ Automatic free tier on signup
- ✅ Stripe-ready architecture

**Key Files:**
- `/models/Subscription.ts` - Subscription data model
- `/models/UsageStats.ts` - Usage tracking model
- `/lib/subscription-service.ts` - Main business logic
- `/lib/subscription-middleware.ts` - API route helpers
- `/lib/subscription-helpers.ts` - Frontend utilities
- `/lib/pricing-config.ts` - Tier configuration
- `/app/api/subscription/*` - API endpoints
