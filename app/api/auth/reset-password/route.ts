import connectDB from '@/lib/db';
import User from '@/models/User';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { rateLimit, RateLimitPresets } from '@/lib/rate-limit';
import { resend, DEFAULT_FROM_EMAIL } from '@/lib/resend';
import {
	getPasswordResetConfirmationEmailHtml,
	getPasswordResetConfirmationEmailText,
} from '@/lib/email-templates';

export async function POST(request: NextRequest) {
	// Apply rate limiting for password reset
	const rateLimitResult = rateLimit(request, RateLimitPresets.PASSWORD_RESET);
	if (rateLimitResult.error) {
		return rateLimitResult.error;
	}

	try {
		await connectDB();

		const body = await request.json();

		if (!body.token || !body.password) {
			return ApiSerializer.error('Token and password are required', 400);
		}

		if (body.password.length < 6) {
			return ApiSerializer.error('Password must be at least 6 characters', 400);
		}

		// Hash the token from URL to compare with stored hash
		const resetTokenHash = crypto
			.createHash('sha256')
			.update(body.token)
			.digest('hex');

		// Find user with valid reset token
		const user = await User.findOne({
			resetPasswordToken: resetTokenHash,
			resetPasswordExpires: { $gt: Date.now() },
			deletedAt: null,
		});

		if (!user) {
			return ApiSerializer.error('Invalid or expired reset token', 400);
		}

		// Update password (will be hashed by pre-save hook)
		user.password = body.password;
		user.resetPasswordToken = null;
		user.resetPasswordExpires = null;
		await user.save();

		// Send confirmation email (don't fail the request if email fails)
		try {
			await resend.emails.send({
				from: DEFAULT_FROM_EMAIL,
				to: user.email,
				subject: 'Password Reset Successful - JobApplicate',
				html: getPasswordResetConfirmationEmailHtml(user.name),
				text: getPasswordResetConfirmationEmailText(user.name),
			});

			if (process.env.NODE_ENV === 'development') {
				console.log('✅ Password reset confirmation email sent successfully');
			}
		} catch (emailError) {
			// Log error but don't fail the request since password was already reset
			console.error('❌ Failed to send confirmation email:', emailError);
		}

		return ApiSerializer.success(null, 'Password has been reset successfully');
	} catch (error) {
		console.error('❌ Password reset error:', error);
		return ApiSerializer.error('Failed to reset password');
	}
}
