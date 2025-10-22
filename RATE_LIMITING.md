# Rate Limiting Documentation

## Overview

Rate limiting has been implemented on all authentication endpoints to prevent brute force attacks and abuse. The implementation uses an in-memory rate limiter that tracks requests by IP address and endpoint.

## Configuration

### Rate Limit Presets

The following presets are available in `lib/rate-limit.ts`:

| Preset | Endpoint | Max Requests | Time Window | Notes |
|--------|----------|--------------|-------------|-------|
| `AUTH` | Login | 5 | 15 minutes | Standard auth protection |
| `SIGNUP` | Signup | 3 | 1 hour | Stricter to prevent abuse |
| `PASSWORD_RESET` | Forgot/Reset Password | 3 | 15 minutes | Prevent enumeration attacks |
| `API` | General API | 100 | 1 minute | For future use |

## Protected Endpoints

The following endpoints are currently protected:

1. **POST /api/auth/login**
   - Limit: 5 requests per 15 minutes
   - Returns 429 status code when exceeded

2. **POST /api/auth/signup**
   - Limit: 3 requests per 1 hour
   - Stricter to prevent fake account creation

3. **POST /api/auth/forgot-password**
   - Limit: 3 requests per 15 minutes
   - Prevents password reset enumeration

4. **POST /api/auth/reset-password**
   - Limit: 3 requests per 15 minutes
   - Prevents token brute forcing

## How It Works

### IP Detection

The rate limiter identifies clients by IP address using the following headers in order:
1. `x-forwarded-for` (first IP in the list)
2. `x-real-ip`
3. `cf-connecting-ip` (Cloudinary)
4. Falls back to 'unknown'

### Rate Limit Response

When a rate limit is exceeded, the API returns:

```json
{
  "status_code": 429,
  "message": "Too many requests. Please try again in 900 seconds."
}
```

HTTP Status: `429 Too Many Requests`

### Memory Management

- The rate limiter uses an in-memory Map to track requests
- Expired entries are automatically cleaned up every 60 seconds
- Each unique IP + endpoint combination is tracked separately

## Usage Example

```typescript
import { rateLimit, RateLimitPresets } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = rateLimit(request, RateLimitPresets.AUTH);
  if (rateLimitResult.error) {
    return rateLimitResult.error;
  }

  // Your endpoint logic here...
}
```

## Custom Rate Limits

You can create custom rate limits by passing options:

```typescript
const rateLimitResult = rateLimit(request, {
  interval: 60 * 1000,     // 1 minute in milliseconds
  maxRequests: 10          // 10 requests per minute
});
```

## Testing Rate Limits

To test the rate limiting:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Make repeated requests to a protected endpoint:
   ```bash
   # First 5 requests will succeed
   for i in {1..6}; do
     curl -X POST http://localhost:3000/api/auth/login \
       -H "Content-Type: application/json" \
       -d '{"email":"test@example.com","password":"test123"}' \
       -i
   done
   ```

3. The 6th request should return HTTP 429

## Production Considerations

### Current Implementation (Development)
- In-memory storage (single server only)
- Data is lost on server restart
- Not suitable for load-balanced environments

### Recommended for Production

For production deployments, consider:

1. **Redis-based rate limiting**
   - Shared state across multiple servers
   - Persistent rate limit data
   - Better performance and scalability

2. **CDN/Edge rate limiting**
   - Cloudflare Rate Limiting
   - AWS WAF
   - Vercel Edge Middleware

3. **Enhanced tracking**
   - User ID-based rate limiting (after authentication)
   - Geographic rate limits
   - Different limits for different user tiers

### Migration to Redis Example

```typescript
// lib/rate-limit-redis.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function rateLimit(identifier: string, maxRequests: number, windowMs: number) {
  const key = `rate-limit:${identifier}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.pexpire(key, windowMs);
  }

  return current <= maxRequests;
}
```

## Monitoring

To monitor rate limiting in production:

1. **Log rate limit violations**
   ```typescript
   if (rateLimitResult.rateLimited) {
     console.warn('Rate limit exceeded', {
       ip: getClientIp(request),
       endpoint: request.nextUrl.pathname,
       count: rateLimitResult.requestCount,
     });
   }
   ```

2. **Track metrics**
   - Number of rate-limited requests
   - Most frequently limited IPs
   - Endpoints with highest rate limit hits

3. **Alerts**
   - Alert on unusual spike in rate-limited requests
   - Could indicate DDoS attempt or legitimate traffic surge

## Security Notes

1. **IP Spoofing**: The rate limiter trusts proxy headers (`x-forwarded-for`). Ensure your reverse proxy/load balancer is properly configured.

2. **Distributed Denial of Service**: In-memory rate limiting only protects the individual server. Use CDN-level protection for DDoS.

3. **Rate Limit Bypass**: Attackers with many IPs can still bypass limits. Consider additional security measures:
   - CAPTCHA after multiple failures
   - Account lockout after repeated attempts
   - Email verification for signups

4. **False Positives**: Users behind NAT/corporate proxies share IPs. Consider:
   - Adjusting limits higher if needed
   - User feedback mechanism
   - Whitelist trusted IPs

## Troubleshooting

### "Too many requests" error immediately
- Check if IP detection is working correctly
- Verify rate limit window hasn't persisted from previous requests
- Clear rate limiter: `rateLimiter.clear()`

### Rate limiting not working
- Verify middleware is called before endpoint logic
- Check if IP address is being detected (not 'unknown')
- Ensure rate limit options are correctly configured

### Memory leaks
- The cleanup interval runs every 60 seconds
- For high-traffic sites, consider moving to Redis
- Monitor memory usage with `process.memoryUsage()`

## API Reference

### `rateLimit(request, options)`

Rate limits a request.

**Parameters:**
- `request: NextRequest` - The Next.js request object
- `options: RateLimiterOptions` - Configuration options
  - `interval: number` - Time window in milliseconds
  - `maxRequests: number` - Max requests in window

**Returns:**
```typescript
{
  error: NextResponse | null,
  rateLimited: boolean,
  resetTime: number,
  requestCount: number
}
```

### `getClientIp(request)`

Extracts the client IP address from request headers.

**Parameters:**
- `request: NextRequest` - The Next.js request object

**Returns:** `string` - IP address or 'unknown'

### `RateLimitPresets`

Predefined rate limit configurations.

**Available presets:**
- `AUTH` - For login endpoints
- `SIGNUP` - For registration
- `PASSWORD_RESET` - For password reset flows
- `API` - General API protection

## Future Enhancements

- [ ] Redis integration for production
- [ ] Per-user rate limiting (after auth)
- [ ] Configurable rate limits via environment variables
- [ ] Dashboard for monitoring rate limit violations
- [ ] Automatic IP blocking after repeated violations
- [ ] CAPTCHA integration for rate-limited users
- [ ] Rate limit headers in response (`X-RateLimit-*`)
