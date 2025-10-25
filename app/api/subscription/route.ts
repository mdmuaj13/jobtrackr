/**
 * Subscription API Routes
 * GET /api/subscription - Get user's current subscription
 * POST /api/subscription - Create/update subscription (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { SubscriptionService } from '@/lib/subscription-service';
import { ApiSerializer } from '@/lib/api-serializer';
import { PricingTier } from '@/types/subscription';

/**
 * GET /api/subscription
 * Get current user's subscription with usage stats
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);

    if (!authResult.user) {
      return ApiSerializer.error(authResult.error || 'Unauthorized', 401);
    }

    const userId = authResult.user.id;

    // Get subscription with usage
    const data = await SubscriptionService.getSubscriptionWithUsage(userId);

    return ApiSerializer.success(data, 'Subscription retrieved successfully');
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return ApiSerializer.error('Failed to fetch subscription', 500);
  }
}

/**
 * POST /api/subscription
 * Create or update subscription (admin or manual management)
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);

    if (!authResult.user) {
      return ApiSerializer.error(authResult.error || 'Unauthorized', 401);
    }

    const adminUserId = authResult.user.id;
    const body = await request.json();

    const {
      userId,
      tier,
      durationMonths = 1,
      adminNotes,
    } = body;

    // Validation
    if (!userId || !tier) {
      return ApiSerializer.error('userId and tier are required', 400);
    }

    if (!Object.values(PricingTier).includes(tier)) {
      return ApiSerializer.error('Invalid pricing tier', 400);
    }

    // Create or update subscription
    const subscription = await SubscriptionService.createOrUpdateSubscription(
      userId,
      tier,
      {
        paymentMethod: 'manual',
        durationMonths,
        adminNotes,
        createdBy: adminUserId,
      }
    );

    return ApiSerializer.success(
      subscription,
      'Subscription updated successfully',
      201
    );
  } catch (error) {
    console.error('Error updating subscription:', error);
    return ApiSerializer.error('Failed to update subscription', 500);
  }
}
