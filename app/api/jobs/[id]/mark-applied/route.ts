import connectDB from '@/lib/db';
import Job from '@/models/Job';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { error: authError } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const job = await Job.findOne({ _id: id, deletedAt: null });

		if (!job) {
			return ApiSerializer.notFound('Job not found');
		}

		// Update job status to 'applied' and set applied_date if not already set
		const updatedJob = await Job.findByIdAndUpdate(
			id,
			{
				status: 'applied',
				...(job.applied_date ? {} : { applied_date: new Date() }),
			},
			{ new: true }
		).populate('company_id', 'name logo_url');

		return ApiSerializer.success(updatedJob, 'Job marked as applied');
	} catch {
		return ApiSerializer.error('Failed to mark job as applied');
	}
}
