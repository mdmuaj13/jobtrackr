# Email Integration with Resend

This document describes the email integration setup using Resend for JobApplicate.

## Overview

JobApplicate uses [Resend](https://resend.com) as the email service provider for sending transactional emails. Resend provides a modern, developer-friendly API for sending emails with excellent deliverability.

## Features

- **Password Reset Emails** - Secure password reset links with 1-hour expiration
- **Confirmation Emails** - Notifications when password is successfully reset
- **Professional Templates** - Beautiful, responsive HTML email templates
- **Development Mode** - Fallback behavior when emails can't be sent in development

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Free tier includes:
   - 100 emails/day
   - 3,000 emails/month
   - No credit card required

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "JobApplicate Development")
5. Select appropriate permissions (Send emails)
6. Copy the API key (starts with `re_`)

### 3. Verify Your Domain (Optional for Development)

For development, you can use the default `onboarding@resend.dev` sender email. For production:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the provided DNS records to your domain registrar
5. Wait for verification (usually a few minutes)

### 4. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Resend Email Service
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=JobApplicate <noreply@yourdomain.com>

# Application URL (used in email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important Notes:**
- For development, you can use `onboarding@resend.dev` as the from email
- For production, you must use a verified domain
- The `NEXT_PUBLIC_APP_URL` should match your application URL

### 5. Test the Integration

Start your development server:

```bash
npm run dev
```

Test password reset:

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@example.com"}'
```

Check your email inbox for the password reset email.

## Email Templates

### Password Reset Email

**Trigger:** POST `/api/auth/forgot-password`

**Subject:** Reset Your Password - JobApplicate

**Content:**
- Personalized greeting with user's name
- Clear call-to-action button
- Plain text link as fallback
- 1-hour expiration warning
- Security notice

**Features:**
- Responsive HTML design
- Gradient header with branding
- Professional styling
- Mobile-friendly
- Plain text fallback

### Password Reset Confirmation Email

**Trigger:** POST `/api/auth/reset-password` (after successful reset)

**Subject:** Password Reset Successful - JobApplicate

**Content:**
- Success notification
- Security tips
- Warning to contact support if unauthorized

**Features:**
- Clean, professional design
- Security-focused messaging
- Reassuring tone

## Development Mode Behavior

When `NODE_ENV=development`:

1. **Email Sending Fails**: The API will still return the reset URL in the response for testing
2. **Console Logging**: All email operations are logged to the console
3. **Default Sender**: Uses `onboarding@resend.dev` if no custom email is set

Example response in development when email fails:

```json
{
  "status_code": 200,
  "message": "Email sending failed, but here is the reset URL for development.",
  "data": {
    "resetUrl": "http://localhost:3000/reset-password?token=abc123...",
    "emailSent": false
  }
}
```

## Production Considerations

### 1. Verified Domain Required

For production, you **must** use a verified domain:

```env
RESEND_FROM_EMAIL=JobApplicate <noreply@yourdomain.com>
```

Using `onboarding@resend.dev` in production is not recommended and may have limitations.

### 2. Error Handling

In production:
- If email fails to send, the reset token is cleared from the database
- User receives a generic error message (doesn't reveal if email exists)
- Errors are logged server-side for debugging

### 3. Rate Limiting

Password reset endpoints are rate-limited:
- Forgot password: 3 requests per 15 minutes
- Reset password: 3 requests per 15 minutes

This prevents abuse and email spam.

### 4. Security Features

- **Token Hashing**: Reset tokens are hashed with SHA-256 before storing
- **Expiration**: Tokens expire after 1 hour
- **One-time Use**: Token is cleared after successful reset
- **User Enumeration Protection**: Same response whether user exists or not

### 5. Monitoring

Monitor these metrics in Resend dashboard:
- Email delivery rate
- Bounce rate
- Complaint rate
- Failed sends

## File Structure

```
lib/
├── resend.ts              # Resend client configuration
├── email-templates.ts     # HTML & text email templates
└── ...

app/api/auth/
├── forgot-password/
│   └── route.ts          # Send password reset email
└── reset-password/
    └── route.ts          # Send confirmation email
```

## Email Templates Customization

### Modifying Templates

Email templates are in `lib/email-templates.ts`:

1. **HTML Templates**: Full HTML with inline CSS for compatibility
2. **Text Templates**: Plain text version for email clients that don't support HTML

### Customization Options

You can customize:
- Colors and branding
- Logo (add image URL)
- Footer text
- Button styles
- Content and messaging

Example:

```typescript
// lib/email-templates.ts
export function getPasswordResetEmailHtml(resetUrl: string, userName: string) {
  return `
    <!DOCTYPE html>
    <html>
      <!-- Your custom HTML here -->
    </html>
  `;
}
```

### Best Practices

1. **Inline CSS**: Always use inline styles for email compatibility
2. **Table Layout**: Use tables for layout (better email client support)
3. **Alt Text**: Include alt text for images
4. **Plain Text**: Always provide a plain text version
5. **Test**: Test emails across different clients (Gmail, Outlook, Apple Mail)

## Testing

### Manual Testing

1. **Test Forgot Password Flow**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

2. **Check Console**: Look for email sending logs
3. **Check Email**: Verify email delivery and appearance
4. **Click Link**: Test the reset link functionality
5. **Test Confirmation**: Verify confirmation email is sent after reset

### Email Preview Tools

Use these tools to preview emails:
- [Litmus](https://litmus.com)
- [Email on Acid](https://www.emailonacid.com)
- [Resend Testing](https://resend.com/docs/send-with-nextjs#testing-emails)

## Troubleshooting

### Email Not Sending

**Problem**: Emails are not being delivered

**Solutions**:
1. Check `RESEND_API_KEY` is set correctly
2. Verify API key has "Send emails" permission
3. Check Resend dashboard for failed sends
4. Verify sender email is from verified domain (production)
5. Check rate limits haven't been exceeded

### Email Going to Spam

**Problem**: Emails end up in spam folder

**Solutions**:
1. Use a verified domain
2. Add SPF, DKIM, and DMARC records
3. Use professional email content
4. Avoid spam trigger words
5. Monitor sender reputation in Resend

### Invalid From Email Error

**Problem**: Error: "Invalid 'from' address"

**Solutions**:
1. Use `onboarding@resend.dev` for development
2. Verify your domain in Resend dashboard
3. Use format: `Name <email@domain.com>`
4. Check `RESEND_FROM_EMAIL` environment variable

### Rate Limit Exceeded

**Problem**: Too many emails being sent

**Solutions**:
1. Check rate limiting configuration
2. Upgrade Resend plan if needed
3. Implement email queuing for high volume
4. Monitor Resend usage dashboard

## API Reference

### `resend.emails.send(options)`

Send an email using Resend.

**Parameters:**
```typescript
{
  from: string,        // Sender email (must be verified domain)
  to: string | string[], // Recipient email(s)
  subject: string,     // Email subject
  html?: string,       // HTML content
  text?: string,       // Plain text content (fallback)
  reply_to?: string,   // Reply-to address
  headers?: object,    // Custom headers
  tags?: object,       // Email tags for tracking
}
```

**Returns:** Promise with email ID

**Example:**
```typescript
await resend.emails.send({
  from: 'JobApplicate <noreply@yourdomain.com>',
  to: user.email,
  subject: 'Reset Your Password - JobApplicate',
  html: getPasswordResetEmailHtml(resetUrl, user.name),
  text: getPasswordResetEmailText(resetUrl, user.name),
});
```

## Advanced Features

### Email Analytics

Track email performance:
- Open rates
- Click rates
- Delivery rates
- Bounce rates

Available in Resend dashboard.

### Webhooks

Set up webhooks for email events:
- `email.sent`
- `email.delivered`
- `email.bounced`
- `email.complained`

Configure in Resend dashboard under Webhooks.

### Batch Sending

Send multiple emails at once:

```typescript
await resend.batch.send([
  {
    from: 'JobApplicate <noreply@yourdomain.com>',
    to: 'user1@example.com',
    subject: 'Email 1',
    html: 'Content 1',
  },
  {
    from: 'JobApplicate <noreply@yourdomain.com>',
    to: 'user2@example.com',
    subject: 'Email 2',
    html: 'Content 2',
  },
]);
```

### Email Scheduling

Schedule emails for future delivery:

```typescript
await resend.emails.send({
  from: 'JobApplicate <noreply@yourdomain.com>',
  to: user.email,
  subject: 'Scheduled Email',
  html: 'Content',
  scheduled_at: '2024-01-01T10:00:00Z', // ISO 8601 format
});
```

## Migration from Other Providers

If migrating from another email provider:

1. **Update Environment Variables**: Set Resend API key
2. **Update Sender Email**: Use verified domain
3. **Test Templates**: Verify email rendering
4. **Update DNS Records**: Add Resend's SPF/DKIM records
5. **Monitor**: Watch deliverability metrics

## Cost Optimization

Tips to optimize email costs:

1. **Avoid Unnecessary Emails**: Only send when required
2. **Use Rate Limiting**: Prevent abuse
3. **Batch Operations**: Send multiple emails together
4. **Monitor Usage**: Track monthly email count
5. **Clean Email Lists**: Remove invalid addresses

## Support

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **Resend Support**: support@resend.com
- **Community**: [GitHub Discussions](https://github.com/resend/resend-node/discussions)

## Future Enhancements

Planned improvements:

- [ ] Welcome email for new users
- [ ] Email verification on signup
- [ ] Job deadline reminder emails
- [ ] Interview reminder emails
- [ ] Weekly job summary emails
- [ ] Newsletter support
- [ ] Email preferences management
- [ ] Unsubscribe functionality
- [ ] Email templates in admin dashboard

## License

This email integration is part of JobApplicate and follows the same license.
