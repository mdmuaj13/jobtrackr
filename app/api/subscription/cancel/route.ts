/**
 * Cancel Subscription API
 * POST /api/subscription/cancel - Cancel user's subscription
 */

import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { SubscriptionService } from '@/lib/subscription-service';
import { ApiSerializer } from '@/types';
import { PricingTier } from '@/types/subscription';

/**
 * POST /api/subscription/cancel
 * Cancel subscription and revert to free tier
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);

    if (!authResult.user) {
      return authResult.error || ApiSerializer.error('Unauthorized', 401);
    }

    const userId = authResult.user.id;

    // Cancel current subscription
    await SubscriptionService.cancelSubscription(userId);

    // Create free tier subscription
    const freeSubscription = await SubscriptionService.createOrUpdateSubscription(
      userId,
      PricingTier.FREE,
      {
        paymentMethod: 'manual',
      }
    );

    return ApiSerializer.success(
      freeSubscription,
      'Subscription cancelled successfully. Reverted to Free tier.'
    );
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return ApiSerializer.error('Failed to cancel subscription', 500);
  }
}
