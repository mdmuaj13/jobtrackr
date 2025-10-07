import connectDB from '@/lib/db';
import User from '@/models/User';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
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
		const savedUser = await user.save();
		console.log('User saved with reset token:', {
			email: savedUser.email,
			hasResetToken: !!savedUser.resetPasswordToken,
			expiresAt: savedUser.resetPasswordExpires,
		});

		// In production, send email with reset link
		// For now, we'll return the token in development
		const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

		// TODO: Send email with resetUrl
		console.log('Password reset URL:', resetUrl);

		return ApiSerializer.success(
			{ resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : null },
			'If an account with that email exists, a password reset link has been sent.'
		);
	} catch (error) {
		console.log(error);
		return ApiSerializer.error('Failed to process request');
	}
}
