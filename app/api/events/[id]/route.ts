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

		// Prepare update object
		const updateData: Record<string, unknown> = {
			...(title !== undefined && { title }),
			...(event_type !== undefined && { event_type }),
			...(description !== undefined && { description }),
			...(date !== undefined && { date: new Date(date) }),
			...(time !== undefined && { time }),
			...(duration !== undefined && { duration }),
			...(location !== undefined && { location }),
			...(meeting_link !== undefined && { meeting_link }),
			...(contact_person !== undefined && { contact_person }),
			...(contact_email !== undefined && { contact_email }),
			...(contact_phone !== undefined && { contact_phone }),
			...(notes !== undefined && { notes }),
			...(reminder !== undefined && { reminder }),
			...(reminder_time !== undefined && { reminder_time }),
			...(status !== undefined && { status }),
		};

		// If status is changing to 'completed' and there's no existing completed_date, set it
		if (status === 'completed' && !event.completed_date) {
			updateData.completed_date = new Date();
		}

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
