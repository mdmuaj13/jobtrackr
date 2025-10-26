import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';
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

		return ApiSerializer.success({
			stats: {
				applied: appliedCount,
				notApplied: notAppliedCount,
				deadlineToday: deadlineTodayCount,
				deadlineWeek: deadlineWeekCount
			},
			recentNotAppliedJobs,
			interviewingJobs
		});
	} catch (error) {
		console.error('Dashboard stats error:', error);
		return ApiSerializer.error('Failed to fetch dashboard stats', 500);
	}
}
