import { Schema, model, models } from 'mongoose';

interface IActivity {
	job_id: Schema.Types.ObjectId;
	user_id: Schema.Types.ObjectId;
	activity_type:
		| 'saved'
		| 'applied'
		| 'interview_scheduled'
		| 'interview_done'
		| 'assessment_received'
		| 'assessment_submitted'
		| 'follow_up_sent'
		| 'offer_received'
		| 'offer_accepted'
		| 'offer_rejected'
		| 'rejected'
		| 'withdrawn'
		| 'status_changed'
		| 'note_added'
		| 'document_uploaded'
		| 'custom';
	title: string;
	description?: string;
	metadata?: Record<string, unknown>;
	timestamp: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

const activitySchema = new Schema<IActivity>(
	{
		job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		activity_type: {
			type: String,
			enum: [
				'saved',
				'applied',
				'interview_scheduled',
				'interview_done',
				'assessment_received',
				'assessment_submitted',
				'follow_up_sent',
				'offer_received',
				'offer_accepted',
				'offer_rejected',
				'rejected',
				'withdrawn',
				'status_changed',
				'note_added',
				'document_uploaded',
				'custom'
			],
			required: true
		},
		title: { type: String, required: true },
		description: { type: String },
		metadata: { type: Schema.Types.Mixed }, // For storing additional data like contact person, salary details, etc.
		timestamp: { type: Date, required: true, default: Date.now },
		deletedAt: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

// Indexes for better query performance
activitySchema.index({ job_id: 1, timestamp: -1 });
activitySchema.index({ user_id: 1 });
activitySchema.index({ activity_type: 1 });
activitySchema.index({ deletedAt: 1 });

const Activity = models.Activity || model<IActivity>('Activity', activitySchema);

export default Activity;
