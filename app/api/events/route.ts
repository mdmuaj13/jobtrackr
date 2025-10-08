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
		const status = searchParams.get('status');
		const event_type = searchParams.get('event_type');
		const from_date = searchParams.get('from_date');
		const to_date = searchParams.get('to_date');

		const query: Record<string, unknown> = {
			user_id: user?.id,
			deletedAt: null,
		};

		if (job_id) {
			query.job_id = job_id;
		}

		if (status) {
			query.status = status;
		}

		if (event_type) {
			query.event_type = event_type;
		}

		if (from_date || to_date) {
			query.date = {};
			if (from_date) {
				(query.date as Record<string, unknown>).$gte = new Date(from_date);
			}
			if (to_date) {
				(query.date as Record<string, unknown>).$lte = new Date(to_date);
			}
		}

		const events = await Event.find(query)
			.populate('job_id', 'title company_name status')
			.sort({ date: 1, time: 1 });

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
			event_type,
			description,
			date,
			time,
			duration,
			location,
			meeting_link,
			contact_person,
			contact_email,
			contact_phone,
			notes,
			reminder,
			reminder_time,
			status,
		} = body;

		// Validate required fields
		if (!job_id || !title || !event_type || !date) {
			return ApiSerializer.error('Missing required fields: job_id, title, event_type, date', 400);
		}

		const event = new Event({
			job_id,
			user_id: user?.id,
			title,
			event_type,
			description,
			date: new Date(date),
			time,
			duration,
			location,
			meeting_link,
			contact_person,
			contact_email,
			contact_phone,
			notes,
			reminder: reminder || false,
			reminder_time,
			status: status || 'scheduled',
		});

		await event.save();

		const populatedEvent = await Event.findById(event._id)
			.populate('job_id', 'title company_name status');

		return ApiSerializer.success(populatedEvent, 'Event created successfully');
	} catch {
		return ApiSerializer.error('Failed to create event');
	}
}
