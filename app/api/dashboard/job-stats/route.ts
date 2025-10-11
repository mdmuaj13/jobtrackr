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

		// Calculate date 30 days ago
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		// Count total jobs applied in last 30 days
		const jobsApplied = await Job.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			status: { $in: ['applied', 'interviewing', 'offered', 'accepted'] },
			createdAt: { $gte: thirtyDaysAgo }
		});

		// Count jobs listed in last 30 days (all non-deleted jobs)
		const jobsListed = await Job.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			createdAt: { $gte: thirtyDaysAgo }
		});

		// Count jobs with deadline ended but not applied
		const now = new Date();
		const deadlineEndedNotApplied = await Job.countDocuments({
			deletedAt: null,
			user_id: user?.id,
			status: 'saved',
			deadline: { $lt: now },
			createdAt: { $gte: thirtyDaysAgo }
		});

		return ApiSerializer.success({
			jobsApplied,
			jobsListed,
			deadlineEndedNotApplied
		});
	} catch (error) {
		console.error('Job stats error:', error);
		return ApiSerializer.error('Failed to fetch job stats', 500);
	}
}
