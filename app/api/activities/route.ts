import connectDB from '@/lib/db';
import Activity from '@/models/Activity';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
	try {
		const { error: authError, user } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const { searchParams } = new URL(request.url);
		const job_id = searchParams.get('job_id');
		const activity_type = searchParams.get('activity_type');
		const from_date = searchParams.get('from_date');
		const to_date = searchParams.get('to_date');

		const query: Record<string, unknown> = {
			user_id: user?.id,
			deletedAt: null,
		};

		if (job_id) {
			query.job_id = job_id;
		}

		if (activity_type) {
			query.activity_type = activity_type;
		}

		if (from_date || to_date) {
			query.timestamp = {};
			if (from_date) {
				(query.timestamp as Record<string, unknown>).$gte = new Date(from_date);
			}
			if (to_date) {
				(query.timestamp as Record<string, unknown>).$lte = new Date(to_date);
			}
		}

		const activities = await Activity.find(query)
			.populate('job_id', 'title company_name status')
			.sort({ timestamp: -1 }); // Most recent first

		return ApiSerializer.success(activities, 'Activities retrieved successfully');
	} catch {
		return ApiSerializer.error('Failed to retrieve activities');
	}
}

export async function POST(request: NextRequest) {
	try {
		const { error: authError, user } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const body = await request.json();

		const {
			job_id,
			activity_type,
			title,
			description,
			metadata,
			timestamp,
		} = body;

		// Validate required fields
		if (!job_id || !activity_type || !title) {
			return ApiSerializer.error('Missing required fields: job_id, activity_type, title', 400);
		}

		const activity = new Activity({
			job_id,
			user_id: user?.id,
			activity_type,
			title,
			description,
			metadata,
			timestamp: timestamp ? new Date(timestamp) : new Date(),
		});

		await activity.save();

		const populatedActivity = await Activity.findById(activity._id)
			.populate('job_id', 'title company_name status');

		return ApiSerializer.success(populatedActivity, 'Activity created successfully');
	} catch {
		return ApiSerializer.error('Failed to create activity');
	}
}
