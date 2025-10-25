/**
 * Usage Tracking API
 * GET /api/subscription/usage - Get user's usage stats
 * POST /api/subscription/usage - Record usage (internal)
 */

import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { SubscriptionService } from '@/lib/subscription-service';
import { ApiSerializer } from '@/lib/api-serializer';

/**
 * GET /api/subscription/usage
 * Get current user's usage statistics
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);

    if (!authResult.user) {
      return ApiSerializer.error(authResult.error || 'Unauthorized', 401);
    }

    const userId = authResult.user.id;
    const usage = await SubscriptionService.getUserUsage(userId);

    return ApiSerializer.success(usage, 'Usage stats retrieved successfully');
  } catch (error) {
    console.error('Error fetching usage:', error);
    return ApiSerializer.error('Failed to fetch usage stats', 500);
  }
}

/**
 * POST /api/subscription/usage
 * Record usage (internal endpoint)
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);

    if (!authResult.user) {
      return ApiSerializer.error(authResult.error || 'Unauthorized', 401);
    }

    const userId = authResult.user.id;
    const body = await request.json();
    const { type, count = 1 } = body;

    if (!type) {
      return ApiSerializer.error('type is required', 400);
    }

    switch (type) {
      case 'job':
        await SubscriptionService.recordJobCreation(userId);
        break;

      case 'chat':
        await SubscriptionService.recordChatMessage(userId);
        break;

      default:
        return ApiSerializer.error('Invalid usage type', 400);
    }

    const usage = await SubscriptionService.getUserUsage(userId);

    return ApiSerializer.success(usage, 'Usage recorded successfully');
  } catch (error) {
    console.error('Error recording usage:', error);
    return ApiSerializer.error('Failed to record usage', 500);
  }
}
