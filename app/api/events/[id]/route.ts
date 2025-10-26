import connectDB from '@/lib/db';
import Event from '@/models/Event';
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

		const event = await Event.findOne({
			_id: id,
			user_id: user?.id,
			deletedAt: null,
		}).populate('job_id', 'title company_name status');

		if (!event) {
			return ApiSerializer.notFound('Event not found');
		}

		return ApiSerializer.success(event, 'Event retrieved successfully');
	} catch {
		return ApiSerializer.error('Failed to retrieve event');
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

		const event = await Event.findOne({
			_id: id,
			user_id: user?.id,
			deletedAt: null
		});

		if (!event) {
			return ApiSerializer.notFound('Event not found');
		}

		const {
			title,
			content,
			schedule_date,
			is_checked,
		} = body;

		// Prepare update object
		const updateData: Record<string, unknown> = {
			...(title !== undefined && { title }),
			...(content !== undefined && { content }),
			...(schedule_date !== undefined && { schedule_date: schedule_date ? new Date(schedule_date) : null }),
			...(is_checked !== undefined && { is_checked }),
		};

		const updatedEvent = await Event.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		).populate('job_id', 'title company_name status');

		return ApiSerializer.success(updatedEvent, 'Event updated successfully');
	} catch {
		return ApiSerializer.error('Failed to update event');
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

		const event = await Event.findOne({
			_id: id,
			user_id: user?.id,
			deletedAt: null
		});

		if (!event) {
			return ApiSerializer.notFound('Event not found');
		}

		await Event.findByIdAndUpdate(id, { deletedAt: new Date() });

		return ApiSerializer.success(null, 'Event deleted successfully');
	} catch {
		return ApiSerializer.error('Failed to delete event');
	}
}
