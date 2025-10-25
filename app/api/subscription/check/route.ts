/**
 * Subscription Check API
 * POST /api/subscription/check - Check if user can perform an action
 */

import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { SubscriptionService } from '@/lib/subscription-service';
import { ApiSerializer } from '@/lib/api-serializer';

/**
 * POST /api/subscription/check
 * Check subscription limits for specific actions
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);

    if (!authResult.user) {
      return ApiSerializer.error(authResult.error || 'Unauthorized', 401);
    }

    const userId = authResult.user.id;
    const body = await request.json();
    const { action } = body;

    if (!action) {
      return ApiSerializer.error('action is required', 400);
    }

    let result;

    switch (action) {
      case 'create_job':
        result = await SubscriptionService.canCreateJob(userId);
        break;

      case 'access_chat':
        result = await SubscriptionService.canAccessChat(userId);
        break;

      case 'send_chat_message':
        result = await SubscriptionService.canSendChatMessage(userId);
        break;

      default:
        return ApiSerializer.error('Invalid action', 400);
    }

    if (!result.allowed) {
      return ApiSerializer.error(result.reason || 'Action not allowed', 403, result);
    }

    return ApiSerializer.success(result, 'Action allowed');
  } catch (error) {
    console.error('Error checking subscription:', error);
    return ApiSerializer.error('Failed to check subscription', 500);
  }
}
