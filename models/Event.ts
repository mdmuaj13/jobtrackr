import { Schema, model, models } from 'mongoose';

interface IEvent {
	job_id: Schema.Types.ObjectId;
	user_id: Schema.Types.ObjectId;
	title: string;
	event_type: 'interview' | 'submission' | 'follow_up' | 'assessment' | 'offer_deadline' | 'other';
	description?: string;
	date: Date;
	time?: string;
	duration?: number; // in minutes
	location?: string;
	meeting_link?: string;
	contact_person?: string;
	contact_email?: string;
	contact_phone?: string;
	notes?: string;
	reminder?: boolean;
	reminder_time?: number; // minutes before event
	status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
	completed_date?: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

const eventSchema = new Schema<IEvent>(
	{
		job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		title: { type: String, required: true },
		event_type: {
			type: String,
			enum: ['interview', 'submission', 'follow_up', 'assessment', 'offer_deadline', 'other'],
			required: true
		},
		description: { type: String },
		date: { type: Date, required: true },
		time: { type: String }, // Format: "HH:MM"
		duration: { type: Number }, // in minutes
		location: { type: String },
		meeting_link: { type: String },
		contact_person: { type: String },
		contact_email: { type: String },
		contact_phone: { type: String },
		notes: { type: String },
		reminder: { type: Boolean, default: false },
		reminder_time: { type: Number }, // minutes before event
		status: {
			type: String,
			enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
			default: 'scheduled'
		},
		completed_date: { type: Date },
		deletedAt: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

// Indexes for better query performance
eventSchema.index({ job_id: 1 });
eventSchema.index({ user_id: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ event_type: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ deletedAt: 1 });

const Event = models.Event || model<IEvent>('Event', eventSchema);

export default Event;
