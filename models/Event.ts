import { Schema, model, models } from 'mongoose';

interface IEvent {
	job_id: Schema.Types.ObjectId;
	user_id: Schema.Types.ObjectId;
	title?: string;
	content: string;
	schedule_date?: Date;
	is_checked: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

const eventSchema = new Schema<IEvent>(
	{
		job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		title: { type: String },
		content: { type: String, required: true },
		schedule_date: { type: Date },
		is_checked: { type: Boolean, default: false },
		deletedAt: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

// Indexes for better query performance
eventSchema.index({ job_id: 1 });
eventSchema.index({ user_id: 1 });
eventSchema.index({ schedule_date: 1 });
eventSchema.index({ is_checked: 1 });
eventSchema.index({ deletedAt: 1 });

const Event = models.Event || model<IEvent>('Event', eventSchema);

export default Event;
