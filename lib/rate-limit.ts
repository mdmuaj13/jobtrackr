import { NextRequest } from 'next/server';
import { ApiSerializer } from '@/types';

interface RateLimitEntry {
	count: number;
	resetTime: number;
}

interface RateLimiterOptions {
	interval: number; // Time window in milliseconds
	maxRequests: number; // Maximum requests allowed in the time window
}

class RateLimiter {
	private requests: Map<string, RateLimitEntry> = new Map();
	private cleanupInterval: NodeJS.Timeout;

	constructor() {
		// Clean up old entries every minute to prevent memory leaks
		this.cleanupInterval = setInterval(() => {
			const now = Date.now();
			for (const [key, entry] of this.requests.entries()) {
				if (entry.resetTime < now) {
					this.requests.delete(key);
				}
			}
		}, 60000); // Run cleanup every 60 seconds
	}

	/**
	 * Check if a request should be rate limited
	 * @param identifier - Unique identifier (e.g., IP address)
	 * @param options - Rate limiting options
	 * @returns true if rate limit exceeded, false otherwise
	 */
	check(identifier: string, options: RateLimiterOptions): boolean {
		const now = Date.now();
		const entry = this.requests.get(identifier);

		if (!entry || entry.resetTime < now) {
			// First request or window has expired - reset counter
			this.requests.set(identifier, {
				count: 1,
				resetTime: now + options.interval,
			});
			return false;
		}

		// Increment counter
		entry.count++;

		// Check if limit exceeded
		if (entry.count > options.maxRequests) {
			return true;
		}

		return false;
	}

	/**
	 * Get the remaining time until rate limit reset
	 * @param identifier - Unique identifier
	 * @returns milliseconds until reset, or 0 if not rate limited
	 */
	getResetTime(identifier: string): number {
		const entry = this.requests.get(identifier);
		if (!entry) return 0;

		const now = Date.now();
		const remaining = entry.resetTime - now;
		return remaining > 0 ? remaining : 0;
	}

	/**
	 * Get the number of requests made in the current window
	 * @param identifier - Unique identifier
	 * @returns number of requests
	 */
	getRequestCount(identifier: string): number {
		const entry = this.requests.get(identifier);
		if (!entry) return 0;

		const now = Date.now();
		if (entry.resetTime < now) return 0;

		return entry.count;
	}

	/**
	 * Manually reset rate limit for an identifier
	 * @param identifier - Unique identifier
	 */
	reset(identifier: string): void {
		this.requests.delete(identifier);
	}

	/**
	 * Clear all rate limit data
	 */
	clear(): void {
		this.requests.clear();
	}

	/**
	 * Stop the cleanup interval (for testing or shutdown)
	 */
	destroy(): void {
		clearInterval(this.cleanupInterval);
	}
}

// Global rate limiter instance
const rateLimiter = new RateLimiter();

/**
 * Get the client's IP address from the request
 * @param request - Next.js request object
 * @returns IP address or 'unknown'
 */
export function getClientIp(request: NextRequest): string {
	// Check various headers for IP address
	const forwarded = request.headers.get('x-forwarded-for');
	const realIp = request.headers.get('x-real-ip');
	const cfConnectingIp = request.headers.get('cf-connecting-ip');

	if (forwarded) {
		// x-forwarded-for can contain multiple IPs, take the first one
		return forwarded.split(',')[0].trim();
	}

	if (realIp) {
		return realIp;
	}

	if (cfConnectingIp) {
		return cfConnectingIp;
	}

	// Fallback
	return 'unknown';
}

/**
 * Rate limiting middleware for API routes
 * @param request - Next.js request object
 * @param options - Rate limiting options
 * @returns null if not rate limited, error response if rate limited
 */
export function rateLimit(
	request: NextRequest,
	options: RateLimiterOptions = {
		interval: 15 * 60 * 1000, // 15 minutes
		maxRequests: 5,
	}
) {
	const ip = getClientIp(request);
	const identifier = `${ip}:${request.nextUrl.pathname}`;

	const isRateLimited = rateLimiter.check(identifier, options);

	if (isRateLimited) {
		const resetTime = rateLimiter.getResetTime(identifier);
		const resetInSeconds = Math.ceil(resetTime / 1000);
		const requestCount = rateLimiter.getRequestCount(identifier);

		return {
			error: ApiSerializer.error(
				`Too many requests. Please try again in ${resetInSeconds} seconds.`,
				429
			),
			rateLimited: true,
			resetTime,
			requestCount,
		};
	}

	return {
		error: null,
		rateLimited: false,
		resetTime: rateLimiter.getResetTime(identifier),
		requestCount: rateLimiter.getRequestCount(identifier),
	};
}

/**
 * Preset rate limiting configurations
 */
export const RateLimitPresets = {
	// Strict rate limit for authentication endpoints (5 requests per 15 minutes)
	AUTH: {
		interval: 15 * 60 * 1000, // 15 minutes
		maxRequests: 5,
	},
	// More lenient for password reset (3 requests per 15 minutes)
	PASSWORD_RESET: {
		interval: 15 * 60 * 1000, // 15 minutes
		maxRequests: 3,
	},
	// General API rate limit (100 requests per minute)
	API: {
		interval: 60 * 1000, // 1 minute
		maxRequests: 100,
	},
	// Very strict for signup to prevent abuse (3 signups per hour)
	SIGNUP: {
		interval: 60 * 60 * 1000, // 1 hour
		maxRequests: 3,
	},
};

export default rateLimiter;
