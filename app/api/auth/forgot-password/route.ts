import connectDB from '@/lib/db';
import User from '@/models/User';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { rateLimit, RateLimitPresets } from '@/lib/rate-limit';
import { resend, DEFAULT_FROM_EMAIL, APP_BASE_URL } from '@/lib/resend';
import {
	getPasswordResetEmailHtml,
	getPasswordResetEmailText,
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

		if (!body.email) {
			return ApiSerializer.error('Email is required', 400);
		}

		const user = await User.findOne({ email: body.email, deletedAt: null });
		if (!user) {
			// Don't reveal if user exists or not for security
			return ApiSerializer.success(
				null,
				'If an account with that email exists, a password reset link has been sent.'
			);
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(32).toString('hex');
		const resetTokenHash = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex');

		// Set token and expiration (1 hour)
		user.resetPasswordToken = resetTokenHash;
		user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

		// Save the user with updated reset token
		await user.save();

		// Generate reset URL
		const resetUrl = `${APP_BASE_URL}/reset-password?token=${resetToken}`;

		try {
			// Send password reset email using Resend
			await resend.emails.send({
				from: DEFAULT_FROM_EMAIL,
				to: user.email,
				subject: 'Reset Your Password - JobTrackr',
				html: getPasswordResetEmailHtml(resetUrl, user.name),
				text: getPasswordResetEmailText(resetUrl, user.name),
			});

			// Log success in development
			if (process.env.NODE_ENV === 'development') {
				console.log('✅ Password reset email sent successfully');
				console.log('Reset URL:', resetUrl);
			}
		} catch (emailError) {
			// Log the email error but don't reveal it to the user for security
			console.error('❌ Failed to send password reset email:', emailError);

			// In development, still return the URL for testing
			if (process.env.NODE_ENV === 'development') {
				console.log('Reset URL (email failed):', resetUrl);
				return ApiSerializer.success(
					{ resetUrl, emailSent: false },
					'Email sending failed, but here is the reset URL for development.'
				);
			}

			// In production, reset the token since email failed
			user.resetPasswordToken = null;
			user.resetPasswordExpires = null;
			await user.save();

			return ApiSerializer.error(
				'Failed to send password reset email. Please try again later.',
				500
			);
		}

		return ApiSerializer.success(
			{
				resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : null,
				emailSent: true,
			},
			'If an account with that email exists, a password reset link has been sent.'
		);
	} catch (error) {
		console.error('❌ Password reset error:', error);
		return ApiSerializer.error('Failed to process request');
	}
}
