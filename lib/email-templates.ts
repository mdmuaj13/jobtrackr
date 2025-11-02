/**
 * Email template for password reset
 */
export function getPasswordResetEmailHtml(
	resetUrl: string,
	userName: string
): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - JobApplicate</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">JobApplicate</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Reset Your Password</h2>

                            <p style="margin: 0 0 16px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                Hi ${userName},
                            </p>

                            <p style="margin: 0 0 24px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                We received a request to reset your password for your JobApplicate account. Click the button below to create a new password:
                            </p>

                            <!-- Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 24px 0;">
                                <tr>
                                    <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                        <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 16px 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                Or copy and paste this link into your browser:
                            </p>

                            <p style="margin: 0 0 24px 0; padding: 12px; background-color: #f5f5f5; border-radius: 4px; word-break: break-all;">
                                <a href="${resetUrl}" target="_blank" style="color: #667eea; text-decoration: none; font-size: 14px;">
                                    ${resetUrl}
                                </a>
                            </p>

                            <div style="padding: 16px; background-color: #fff9e6; border-left: 4px solid #ffc107; border-radius: 4px; margin-bottom: 24px;">
                                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                                    <strong>⏰ This link will expire in 1 hour</strong> for security reasons.
                                </p>
                            </div>

                            <p style="margin: 0 0 16px 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 8px 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                                This is an automated message from JobApplicate. Please do not reply to this email.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                                © ${new Date().getFullYear()} JobApplicate. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}

/**
 * Plain text version of password reset email
 */
export function getPasswordResetEmailText(
	resetUrl: string,
	userName: string
): string {
	return `
JobApplicate - Reset Your Password

Hi ${userName},

We received a request to reset your password for your JobApplicate account.

To reset your password, click the link below or copy and paste it into your browser:

${resetUrl}

⏰ This link will expire in 1 hour for security reasons.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

---
This is an automated message from JobApplicate. Please do not reply to this email.
© ${new Date().getFullYear()} JobApplicate. All rights reserved.
`;
}

/**
 * Email template for successful password reset confirmation
 */
export function getPasswordResetConfirmationEmailHtml(
	userName: string
): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful - JobApplicate</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">JobApplicate</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <div style="text-align: center; margin-bottom: 24px;">
                                <div style="display: inline-block; width: 64px; height: 64px; background-color: #d4edda; border-radius: 50%; line-height: 64px; font-size: 32px;">
                                    ✓
                                </div>
                            </div>

                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600; text-align: center;">Password Reset Successful</h2>

                            <p style="margin: 0 0 16px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                Hi ${userName},
                            </p>

                            <p style="margin: 0 0 24px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                Your password has been successfully reset. You can now log in to your JobApplicate account using your new password.
                            </p>

                            <div style="padding: 16px; background-color: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 4px; margin-bottom: 24px;">
                                <p style="margin: 0; color: #0d47a1; font-size: 14px; line-height: 1.5;">
                                    <strong>🔒 Security Tip:</strong> For your security, make sure to use a strong, unique password that you don't use on other websites.
                                </p>
                            </div>

                            <p style="margin: 0 0 16px 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                If you didn't make this change or if you believe an unauthorized person has accessed your account, please contact our support team immediately.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 8px 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                                This is an automated message from JobApplicate. Please do not reply to this email.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                                © ${new Date().getFullYear()} JobApplicate. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}

/**
 * Plain text version of password reset confirmation email
 */
export function getPasswordResetConfirmationEmailText(
	userName: string
): string {
	return `
JobApplicate - Password Reset Successful

Hi ${userName},

Your password has been successfully reset. You can now log in to your JobApplicate account using your new password.

🔒 Security Tip: For your security, make sure to use a strong, unique password that you don't use on other websites.

If you didn't make this change or if you believe an unauthorized person has accessed your account, please contact our support team immediately.

---
This is an automated message from JobApplicate. Please do not reply to this email.
© ${new Date().getFullYear()} JobApplicate. All rights reserved.
`;
}
