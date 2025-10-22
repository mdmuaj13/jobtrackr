import connectDB from '@/lib/db';
import User from '@/models/User';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { rateLimit, RateLimitPresets } from '@/lib/rate-limit';

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

		return ApiSerializer.success(null, 'Password has been reset successfully');
	} catch (error) {
		console.log(error);
		return ApiSerializer.error('Failed to reset password');
	}
}
