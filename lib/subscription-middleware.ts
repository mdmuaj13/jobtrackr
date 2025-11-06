/**
 * Subscription Middleware Helpers
 * Provides easy-to-use middleware functions for API routes
 */

import { NextRequest } from 'next/server';
import { SubscriptionService } from './subscription-service';
import { ApiSerializer } from '@/types';
import { authenticateToken } from './auth';

/**
 * Middleware to check if user can create a job
 * Returns error response if limit reached, otherwise null
 */
export async function requireJobCreationAccess(request: NextRequest) {
  const { error: authError, user } = await authenticateToken(request);
  if (authError || !user) {
    return { error: authError, user: null };
  }

  const canCreate = await SubscriptionService.canCreateJob(user.id);
  if (!canCreate.allowed) {
    return {
      error: ApiSerializer.error(
        canCreate.reason || 'Job creation limit reached',
        403
      ),
      user: null,
    };
  }

  return { error: null, user };
}

/**
 * Middleware to check if user can send chat messages
 * Returns error response if limit reached, otherwise null
 */
export async function requireChatMessageAccess(request: NextRequest) {
  const { error: authError, user } = await authenticateToken(request);
  if (authError || !user) {
    return { error: authError, user: null };
  }

  const canSend = await SubscriptionService.canSendChatMessage(user.id);
  if (!canSend.allowed) {
    return {
      error: ApiSerializer.error(
        canSend.reason || 'Chat message limit reached',
        403
      ),
      user: null,
    };
  }

  return { error: null, user };
}

/**
 * Middleware to check if user can access chat feature
 * Returns error response if no access, otherwise null
 */
export async function requireChatAccess(request: NextRequest) {
  const { error: authError, user } = await authenticateToken(request);
  if (authError || !user) {
    return { error: authError, user: null };
  }

  const hasAccess = await SubscriptionService.canAccessChat(user.id);
  if (!hasAccess.allowed) {
    return {
      error: ApiSerializer.error(
        hasAccess.reason || 'Chat access not available',
        403
      ),
      user: null,
    };
  }

  return { error: null, user };
}

/**
 * Helper to check feature access by tier
 */
export async function checkFeatureAccess(
  userId: string,
  feature: 'jobs' | 'chat'
) {
  if (feature === 'jobs') {
    return await SubscriptionService.canCreateJob(userId);
  }

  if (feature === 'chat') {
    return await SubscriptionService.canSendChatMessage(userId);
  }

  return { allowed: false, reason: 'Invalid feature' };
}
