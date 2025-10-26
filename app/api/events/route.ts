import connectDB from '@/lib/db';
import Event from '@/models/Event';
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
		const is_checked = searchParams.get('is_checked');

		const query: Record<string, unknown> = {
			user_id: user?.id,
			deletedAt: null,
		};

		if (job_id) {
			query.job_id = job_id;
		}

		if (is_checked !== null) {
			query.is_checked = is_checked === 'true';
		}

		const events = await Event.find(query)
			.populate('job_id', 'title company_name status')
			.sort({ schedule_date: -1, createdAt: -1 });

		return ApiSerializer.success(events, 'Events retrieved successfully');
	} catch {
		return ApiSerializer.error('Failed to retrieve events');
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
			title,
			content,
			schedule_date,
			is_checked,
		} = body;

		// Validate required fields
		if (!job_id || !content) {
			return ApiSerializer.error('Missing required fields: job_id, content', 400);
		}

		const event = new Event({
			job_id,
			user_id: user?.id,
			title,
			content,
			schedule_date: schedule_date ? new Date(schedule_date) : undefined,
			is_checked: is_checked || false,
		});

		await event.save();

		const populatedEvent = await Event.findById(event._id)
			.populate('job_id', 'title company_name status');

		return ApiSerializer.success(populatedEvent, 'Event created successfully');
	} catch {
		return ApiSerializer.error('Failed to create event');
	}
}
