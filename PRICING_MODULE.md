# Pricing Module Documentation

## Overview

The JobApplicate pricing module implements a comprehensive subscription and tier-based access control system. It supports three pricing tiers (Free, Pro, Custom) with specific feature limits and usage tracking.

## Features

- **Three Pricing Tiers**: Free, Pro, and Custom
- **Usage Tracking**: Monthly job creation and chat message limits
- **Automatic Limit Enforcement**: API-level checks before resource creation
- **Manual Subscription Management**: Admin panel for manual upgrades
- **Usage Analytics**: Dashboard showing current usage and limits
- **Automatic Monthly Reset**: Usage stats reset at the start of each month

## Pricing Tiers

### Free Tier
- **Price**: $0/month
- **Features**:
  - 20 jobs per month
  - No chat access
  - Calendar access
  - Companies access
  - Vendors access
  - Tests access
  - Dashboard access

### Pro Tier
- **Price**: $9.99/month
- **Features**:
  - Unlimited jobs per month
  - 200 chat messages per month
  - All Free tier features
  - Data export
  - Priority support

### Custom Tier
- **Price**: Custom pricing
- **Features**:
  - Unlimited jobs
  - Unlimited chat messages
  - All Pro tier features
  - Custom integrations
  - Dedicated support
  - Custom branding
  - API access

## Architecture

### Database Models

#### Subscription Model (`/models/Subscription.ts`)
Stores user subscription information:
- `userId`: Reference to user
- `tier`: Pricing tier (free/pro/custom)
- `status`: Subscription status (active/inactive/cancelled/expired/trial)
- `paymentMethod`: How subscription was purchased (manual/online/none)
- `startDate`, `endDate`: Subscription period
- `stripeCustomerId`, `stripeSubscriptionId`: For future online payments
- `adminNotes`: Notes for manual subscriptions
- `createdBy`: Admin who created/modified subscription

#### UsageStats Model (`/models/UsageStats.ts`)
Tracks monthly usage:
- `userId`: Reference to user
- `currentMonth`: Current month (YYYY-MM)
- `jobsCreated`: Number of jobs created this month
- `chatMessages`: Number of chat messages this month
- `monthlyStats`: Historical data (last 12 months)
- `lastResetDate`: When stats were last reset

### Services

#### SubscriptionService (`/lib/subscription-service.ts`)
Core service for subscription management:

**Key Methods**:
- `getUserSubscription(userId)`: Get active subscription
- `getUserTier(userId)`: Get user's pricing tier
- `getUserUsage(userId)`: Get usage statistics
- `canCreateJob(userId)`: Check if user can create a job
- `canAccessChat(userId)`: Check if user has chat access
- `canSendChatMessage(userId)`: Check if user can send chat message
- `recordJobCreation(userId)`: Record job creation in usage
- `recordChatMessage(userId)`: Record chat message in usage
- `createOrUpdateSubscription(...)`: Create/update subscription
- `cancelSubscription(userId)`: Cancel subscription
- `initializeFreeSubscription(userId)`: Create free subscription for new user

### API Endpoints

#### GET `/api/subscription`
Get current user's subscription with usage stats.

**Response**:
```json
{
  "subscription": {
    "tier": "free",
    "status": "active",
    "startDate": "2025-01-01",
    "paymentMethod": "none"
  },
  "usage": {
    "jobsCreated": 5,
    "chatMessages": 0,
    "currentMonth": "2025-10"
  },
  "tier": "free",
  "config": {
    "name": "Free",
    "price": 0,
    "features": { ... }
  }
}
```

#### POST `/api/subscription`
Create or update subscription (admin/manual management).

**Request**:
```json
{
  "userId": "user123",
  "tier": "pro",
  "durationMonths": 1,
  "adminNotes": "Manual upgrade - payment received via wire"
}
```

#### POST `/api/subscription/check`
Check if user can perform an action.

**Request**:
```json
{
  "action": "create_job" // or "access_chat" or "send_chat_message"
}
```

**Response**:
```json
{
  "allowed": true,
  "currentUsage": 5,
  "limit": 20,
  "tier": "free"
}
```

#### GET `/api/subscription/usage`
Get user's usage statistics.

#### POST `/api/subscription/usage`
Record usage (internal).

**Request**:
```json
{
  "type": "job", // or "chat"
  "count": 1
}
```

#### POST `/api/subscription/cancel`
Cancel subscription and revert to free tier.

#### GET `/api/pricing`
Get all pricing tiers configuration.

### Frontend Components

#### Pricing Page (`/app/pricing/page.tsx`)
Public pricing page showing all tiers with features and pricing.

**Route**: `/pricing`

#### Subscription Dashboard (`/app/app/subscription/page.tsx`)
User dashboard for managing subscription and viewing usage.

**Route**: `/app/subscription`

**Features**:
- View current tier and status
- Usage statistics with progress bars
- Upgrade/cancel subscription
- Next billing date

#### Admin Panel (`/app/app/admin/subscriptions/page.tsx`)
Admin interface for manual subscription management.

**Route**: `/app/admin/subscriptions`

**Features**:
- Search users by email
- Update subscription tier
- Set duration
- Add admin notes

#### Chat Page (`/app/app/chat/page.tsx`)
Protected chat page (Pro/Custom only).

**Route**: `/app/chat`

**Features**:
- Access control based on tier
- Message limit tracking
- Upgrade prompt for free users

### React Hook

#### useSubscription (`/hooks/useSubscription.ts`)
React hook for subscription management in components.

**Usage**:
```tsx
import { useSubscription } from '@/hooks/useSubscription';

function MyComponent() {
  const {
    data,           // Subscription data
    loading,        // Loading state
    error,          // Error message
    tier,           // Current tier
    isPro,          // Boolean helpers
    isFree,
    isCustom,
    usage,          // Usage stats
    config,         // Tier config
    canCreateJob,   // Check functions
    canAccessChat,
    canSendChatMessage,
    refresh,        // Refresh data
  } = useSubscription();

  // Check before creating job
  const handleCreateJob = async () => {
    const result = await canCreateJob();
    if (!result.allowed) {
      alert(result.reason);
      return;
    }
    // Proceed with job creation
  };
}
```

## Implementation Guide

### 1. Enforcing Limits on API Routes

Add subscription checks to your API routes:

```typescript
import { SubscriptionService } from '@/lib/subscription-service';

export async function POST(request: NextRequest) {
  const { user } = await authenticateToken(request);

  // Check subscription limit
  const canCreate = await SubscriptionService.canCreateJob(user.id);
  if (!canCreate.allowed) {
    return ApiSerializer.error(canCreate.reason, 403);
  }

  // Create resource...

  // Record usage
  await SubscriptionService.recordJobCreation(user.id);

  return ApiSerializer.success(data);
}
```

### 2. Protecting Frontend Pages

Use the `useSubscription` hook to protect pages:

```tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { useEffect, useState } from 'react';

export default function ProtectedPage() {
  const { canAccessChat } = useSubscription();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const result = await canAccessChat();
    setHasAccess(result.allowed);
  };

  if (!hasAccess) {
    return <UpgradePrompt />;
  }

  return <PageContent />;
}
```

### 3. Displaying Usage in UI

```tsx
import { useSubscription } from '@/hooks/useSubscription';

function UsageWidget() {
  const { usage, config } = useSubscription();

  const limit = config?.features.jobsPerMonth;
  const percentage = limit === 'unlimited'
    ? 0
    : (usage.jobsCreated / limit) * 100;

  return (
    <div>
      <p>{usage.jobsCreated} / {limit === 'unlimited' ? '∞' : limit}</p>
      {limit !== 'unlimited' && <Progress value={percentage} />}
    </div>
  );
}
```

## Manual Subscription Management

### Admin Workflow

1. Navigate to `/app/admin/subscriptions`
2. Search for user by email
3. Select pricing tier
4. Set duration (for paid tiers)
5. Add admin notes explaining the change
6. Click "Update Subscription"

### Use Cases for Manual Management

- **Offline Payments**: User pays via bank transfer or check
- **Gifts**: Giving free Pro access to special users
- **Refunds**: Downgrading after refund
- **Support Cases**: Temporary upgrades for testing
- **Partnerships**: Custom pricing for partners

## User Signup Flow

When a new user signs up:

1. User creates account via `/api/auth/signup`
2. System creates User record
3. System automatically creates Free tier subscription
4. User can upgrade via pricing page

## Monthly Reset

Usage stats automatically reset at the start of each month:

1. When usage is checked, system compares `currentMonth` with actual month
2. If different, current stats are archived to `monthlyStats`
3. Counters reset to 0
4. New month begins

Historical data is kept for last 12 months.

## Future Enhancements

### Online Payment Integration (Stripe)

To implement online payments:

1. Add Stripe SDK to dependencies
2. Create Stripe customer on signup
3. Implement checkout session endpoint
4. Add webhook handler for subscription events
5. Update UI with payment forms
6. Test with Stripe test mode

**Files to modify**:
- `/app/api/subscription/checkout/route.ts` (new)
- `/app/api/webhooks/stripe/route.ts` (new)
- `/app/app/subscription/page.tsx` (add payment UI)
- `/lib/stripe.ts` (new - Stripe client)

### Additional Features

- **Team Plans**: Multiple users under one subscription
- **Annual Billing**: Discounted yearly plans
- **Trial Periods**: 7-day free trial of Pro tier
- **Referral Program**: Credits for referring users
- **Usage Alerts**: Email notifications at 80% usage
- **Overage Handling**: Allow paid overages or hard limits
- **Invoice Generation**: PDF invoices for paid plans

## Configuration

### Modifying Pricing Tiers

Edit `/lib/pricing-config.ts` to change tier features or add new tiers:

```typescript
export const PRICING_TIERS = {
  [PricingTier.PRO]: {
    name: 'Pro',
    price: 9.99, // Change price here
    features: {
      jobsPerMonth: 'unlimited',
      chatMessagesPerMonth: 300, // Increase limit
      // ... other features
    },
  },
};
```

### Environment Variables

No additional environment variables needed for manual management.

For Stripe integration (future):
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Testing

### Manual Testing Checklist

1. **Signup Flow**
   - [ ] New user gets Free tier subscription
   - [ ] Can create up to 20 jobs
   - [ ] Cannot access chat

2. **Job Creation Limits**
   - [ ] Free user blocked at 21st job
   - [ ] Error message shown
   - [ ] Pro user can create unlimited

3. **Chat Access**
   - [ ] Free user sees upgrade prompt
   - [ ] Pro user can access chat
   - [ ] Pro user blocked at 201st message

4. **Admin Management**
   - [ ] Can search users
   - [ ] Can upgrade to Pro
   - [ ] Subscription updates correctly
   - [ ] Admin notes saved

5. **Usage Tracking**
   - [ ] Job creation increments counter
   - [ ] Chat message increments counter
   - [ ] Stats reset monthly
   - [ ] Historical data preserved

6. **Subscription Dashboard**
   - [ ] Shows correct tier
   - [ ] Usage displayed accurately
   - [ ] Cancel subscription works
   - [ ] Reverts to Free after cancel

### Test User Setup

```typescript
// Create test users with different tiers
const freeUser = { email: 'free@test.com', tier: 'free' };
const proUser = { email: 'pro@test.com', tier: 'pro' };
const customUser = { email: 'custom@test.com', tier: 'custom' };
```

## Troubleshooting

### Issue: Subscription not found
**Solution**: Ensure user has a subscription created. Run:
```typescript
await SubscriptionService.initializeFreeSubscription(userId);
```

### Issue: Usage not resetting monthly
**Solution**: Check `UsageStats.resetIfNeeded()` is called before usage checks.

### Issue: Limits not enforced
**Solution**: Verify API routes call `SubscriptionService.canCreateJob()` before creation.

### Issue: Free users accessing chat
**Solution**: Ensure chat page uses `canAccessChat()` check in useEffect.

## Support

For questions or issues with the pricing module:
- Check this documentation
- Review code comments in service files
- Test with different tiers
- Check browser console for errors

## License

Part of JobApplicate application - Internal use only.
