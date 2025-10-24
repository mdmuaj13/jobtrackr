/**
 * Pricing Tiers API
 * GET /api/pricing - Get all pricing tiers configuration
 */

import { NextRequest } from 'next/server';
import { ApiSerializer } from '@/types';
import { getAllPricingTiers } from '@/lib/pricing-config';

/**
 * GET /api/pricing
 * Get all available pricing tiers
 */
export async function GET(request: NextRequest) {
  try {
    const tiers = getAllPricingTiers();

    return ApiSerializer.success(tiers, 'Pricing tiers retrieved successfully');
  } catch (error) {
    console.error('Error fetching pricing tiers:', error);
    return ApiSerializer.error('Failed to fetch pricing tiers', 500);
  }
}
