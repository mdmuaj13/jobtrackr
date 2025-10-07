import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';
import { authenticateToken } from '@/lib/auth';
import { ApiSerializer } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		await connectDB();

		const user = await authenticateToken(req);
		if (!user) {
			return ApiSerializer.error('Unauthorized', 401);
		}

		// Fetch all jobs that have either a deadline or applied_date
		const jobs = await Job.find({
			deletedAt: null,
			$or: [
				{ deadline: { $exists: true, $ne: null } },
				{ applied_date: { $exists: true, $ne: null } }
			]
		})
			.select('title company_name status deadline applied_date location job_type work_mode')
			.lean();

		return ApiSerializer.success(jobs);
	} catch (error) {
		console.error('Calendar jobs error:', error);
		return ApiSerializer.error('Failed to fetch calendar jobs', 500);
	}
}
