/**
 * User Profile API Routes
 * GET: Get current user profile
 * PUT: Update current user profile
 */

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

/**
 * GET /api/profile
 * Get current user's profile information
 */
export async function GET(req: NextRequest) {
	try {
		// Verify authentication
		const authHeader = req.headers.get('authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return NextResponse.json(
				{ error: 'Unauthorized - No token provided' },
				{ status: 401 }
			);
		}

		const token = authHeader.split(' ')[1];
		const decoded = verifyToken(token);

		if (!decoded || !decoded.userId) {
			return NextResponse.json(
				{ error: 'Unauthorized - Invalid token' },
				{ status: 401 }
			);
		}

		// Connect to database
		await connectDB();

		// Find user
		const user = await User.findById(decoded.userId).select('-password');

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json({
			success: true,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				image: user.image,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error) {
		console.error('Error fetching profile:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch profile' },
			{ status: 500 }
		);
	}
}

/**
 * PUT /api/profile
 * Update current user's profile information
 */
export async function PUT(req: NextRequest) {
	try {
		// Verify authentication
		const authHeader = req.headers.get('authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return NextResponse.json(
				{ error: 'Unauthorized - No token provided' },
				{ status: 401 }
			);
		}

		const token = authHeader.split(' ')[1];
		const decoded = verifyToken(token);

		if (!decoded || !decoded.userId) {
			return NextResponse.json(
				{ error: 'Unauthorized - Invalid token' },
				{ status: 401 }
			);
		}

		// Parse request body
		const body = await req.json();
		const { name, image } = body;

		// Validate input
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return NextResponse.json(
				{ error: 'Name is required and must be a non-empty string' },
				{ status: 400 }
			);
		}

		// Connect to database
		await connectDB();

		// Update user
		const updateData: any = {
			name: name.trim(),
		};

		// Only update image if provided
		if (image !== undefined) {
			updateData.image = image;
		}

		const user = await User.findByIdAndUpdate(
			decoded.userId,
			updateData,
			{ new: true, runValidators: true }
		).select('-password');

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json({
			success: true,
			message: 'Profile updated successfully',
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				image: user.image,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error) {
		console.error('Error updating profile:', error);
		return NextResponse.json(
			{ error: 'Failed to update profile' },
			{ status: 500 }
		);
	}
}
