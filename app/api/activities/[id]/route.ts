import connectDB from '@/lib/db';
import Activity from '@/models/Activity';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { error: authError, user } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const activity = await Activity.findOne({
			_id: id,
			user_id: user?.id,
			deletedAt: null,
		}).populate('job_id', 'title company_name status');

		if (!activity) {
			return ApiSerializer.notFound('Activity not found');
		}

		return ApiSerializer.success(activity, 'Activity retrieved successfully');
	} catch {
		return ApiSerializer.error('Failed to retrieve activity');
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { error: authError, user } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const body = await request.json();

		const activity = await Activity.findOne({
			_id: id,
			user_id: user?.id,
			deletedAt: null
		});

		if (!activity) {
			return ApiSerializer.notFound('Activity not found');
		}

		const {
			activity_type,
			title,
			description,
			metadata,
			timestamp,
		} = body;

		// Prepare update object
		const updateData: Record<string, unknown> = {
			...(activity_type !== undefined && { activity_type }),
			...(title !== undefined && { title }),
			...(description !== undefined && { description }),
			...(metadata !== undefined && { metadata }),
			...(timestamp !== undefined && { timestamp: new Date(timestamp) }),
		};

		const updatedActivity = await Activity.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		).populate('job_id', 'title company_name status');

		return ApiSerializer.success(updatedActivity, 'Activity updated successfully');
	} catch {
		return ApiSerializer.error('Failed to update activity');
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { error: authError, user } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const activity = await Activity.findOne({
			_id: id,
			user_id: user?.id,
			deletedAt: null
		});

		if (!activity) {
			return ApiSerializer.notFound('Activity not found');
		}

		await Activity.findByIdAndUpdate(id, { deletedAt: new Date() });

		return ApiSerializer.success(null, 'Activity deleted successfully');
	} catch {
		return ApiSerializer.error('Failed to delete activity');
	}
}
