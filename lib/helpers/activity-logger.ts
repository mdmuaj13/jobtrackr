import Activity from '@/models/Activity';
import { Schema } from 'mongoose';

interface LogActivityParams {
	job_id: string | Schema.Types.ObjectId;
	user_id: string | Schema.Types.ObjectId;
	activity_type: string;
	title: string;
	description?: string;
	metadata?: Record<string, unknown>;
	timestamp?: Date;
}

/**
 * Helper function to log activities for jobs
 * This can be called from various parts of the application to automatically track job activities
 */
export async function logActivity(params: LogActivityParams) {
	try {
		const activity = new Activity({
			job_id: params.job_id,
			user_id: params.user_id,
			activity_type: params.activity_type,
			title: params.title,
			description: params.description,
			metadata: params.metadata,
			timestamp: params.timestamp || new Date(),
		});

		await activity.save();
		return activity;
	} catch (error) {
		console.error('Failed to log activity:', error);
		return null;
	}
}

/**
 * Auto-generate activity title and description based on status changes
 */
export function getActivityDetailsForStatus(
	oldStatus: string | undefined,
	newStatus: string
): { activity_type: string; title: string; description?: string } {
	switch (newStatus) {
		case 'saved':
			return {
				activity_type: 'saved',
				title: 'Job Saved',
				description: 'Added this job to your tracker',
			};
		case 'applied':
			return {
				activity_type: 'applied',
				title: 'Application Submitted',
				description: 'Successfully submitted your application',
			};
		case 'interviewing':
			return {
				activity_type: 'status_changed',
				title: 'Interview Process Started',
				description: `Status changed from ${oldStatus || 'saved'} to interviewing`,
			};
		case 'offered':
			return {
				activity_type: 'offer_received',
				title: 'Offer Received! 🎉',
				description: 'Received a job offer',
			};
		case 'accepted':
			return {
				activity_type: 'offer_accepted',
				title: 'Offer Accepted! 🎊',
				description: 'Congratulations! You accepted the offer',
			};
		case 'rejected':
			return {
				activity_type: 'rejected',
				title: 'Application Rejected',
				description: 'Unfortunately, the application was not successful',
			};
		case 'withdrawn':
			return {
				activity_type: 'withdrawn',
				title: 'Application Withdrawn',
				description: 'You withdrew your application',
			};
		default:
			return {
				activity_type: 'status_changed',
				title: `Status Updated to ${newStatus}`,
				description: `Status changed from ${oldStatus || 'unknown'} to ${newStatus}`,
			};
	}
}
