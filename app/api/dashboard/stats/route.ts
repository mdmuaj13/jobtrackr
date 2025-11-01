import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';
import Event from '@/models/Event';
import { authenticateToken } from '@/lib/auth';
import { ApiSerializer } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		await connectDB();

		const { error: authError, user } = await authenticateToken(req);
		if (authError) return authError;

		const now = new Date();
		const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const todayEnd = new Date(todayStart);
		todayEnd.setDate(todayEnd.getDate() + 1);

		const weekEnd = new Date(todayStart);
		weekEnd.setDate(weekEnd.getDate() + 7);

		// Count jobs applied
		const appliedCount = await Job.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			status: { $in: ['applied', 'interviewing', 'offered', 'accepted'] }
		});

		// Count jobs not yet applied
		const notAppliedCount = await Job.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			status: 'saved'
		});

		// Count jobs with deadline today
		const deadlineTodayCount = await Job.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			deadline: { $gte: todayStart, $lt: todayEnd }
		});

		// Count jobs with deadline this week
		const deadlineWeekCount = await Job.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			deadline: { $gte: todayStart, $lt: weekEnd }
		});

		// Get last 5 jobs not applied (saved status)
		const recentNotAppliedJobs = await Job.find({
			deletedAt: null,
			user_id: user?.id,
			status: 'saved'
		})
			.sort({ createdAt: -1 })
			.limit(5)
			.lean();

		// Get interviewing jobs
		const interviewingJobs = await Job.find({
			deletedAt: null,
			user_id: user?.id,
			status: 'interviewing'
		})
			.sort({ updatedAt: -1 })
			.limit(5)
			.lean();

		// Get last 5 recent events with populated job data
		const recentEvents = await Event.find({
			deletedAt: null,
			user_id: user?.id
		})
			.populate('job_id', 'title company_name status')
			.sort({ createdAt: -1 })
			.limit(5)
			.lean();

		// Event statistics
		const totalEventsCount = await Event.countDocuments({
			deletedAt: null,
			user_id: user?.id
		});

		const completedEventsCount = await Event.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			is_checked: true
		});

		const pendingEventsCount = await Event.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			is_checked: false
		});

		const upcomingEventsCount = await Event.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			schedule_date: { $gte: todayStart }
		});

		return ApiSerializer.success({
			stats: {
				applied: appliedCount,
				notApplied: notAppliedCount,
				deadlineToday: deadlineTodayCount,
				deadlineWeek: deadlineWeekCount
			},
			eventStats: {
				total: totalEventsCount,
				completed: completedEventsCount,
				pending: pendingEventsCount,
				upcoming: upcomingEventsCount
			},
			recentNotAppliedJobs,
			interviewingJobs,
			recentEvents
		});
	} catch (error) {
		console.error('Dashboard stats error:', error);
		return ApiSerializer.error('Failed to fetch dashboard stats', 500);
	}
}
