import connectDB from '@/lib/db';
import Job from '@/models/Job';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { updateJobSchema } from '@/lib/validations/job';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		await connectDB();

		const job = await Job.findOne({
			_id: id,
			deletedAt: null,
		}).populate('company_id', 'name logo_url');

		if (!job) {
			return ApiSerializer.notFound('Job not found');
		}

		return ApiSerializer.success(job, 'Job retrieved successfully');
	} catch {
		return ApiSerializer.error('Failed to retrieve job');
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { error: authError } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const body = await request.json();

		const validation = updateJobSchema.safeParse(body);
		if (!validation.success) {
			return ApiSerializer.error(validation.error.issues[0].message, 400);
		}

		const {
			title,
			description,
			company_name,
			company_id,
			location,
			job_type,
			work_mode,
			salary_min,
			salary_max,
			salary_currency,
			job_url,
			company_url,
			linkedin_url,
			application_link,
			application_process,
			status,
			deadline,
			special_requirements,
			skills,
			notes,
		} = validation.data;

		const job = await Job.findOne({ _id: id, deletedAt: null });

		if (!job) {
			return ApiSerializer.notFound('Job not found');
		}

		const updatedJob = await Job.findByIdAndUpdate(
			id,
			{
				...(title !== undefined && { title }),
				...(description !== undefined && { description }),
				...(company_name !== undefined && { company_name }),
				...(company_id !== undefined && { company_id: company_id || undefined }),
				...(location !== undefined && { location }),
				...(job_type !== undefined && { job_type }),
				...(work_mode !== undefined && { work_mode }),
				...(salary_min !== undefined && { salary_min }),
				...(salary_max !== undefined && { salary_max }),
				...(salary_currency !== undefined && { salary_currency }),
				...(job_url !== undefined && { job_url: job_url || undefined }),
				...(company_url !== undefined && { company_url: company_url || undefined }),
				...(linkedin_url !== undefined && { linkedin_url: linkedin_url || undefined }),
				...(application_link !== undefined && { application_link: application_link || undefined }),
				...(application_process !== undefined && { application_process }),
				...(status !== undefined && { status }),
				...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : undefined }),
				...(special_requirements !== undefined && { special_requirements }),
				...(skills !== undefined && { skills }),
				...(notes !== undefined && { notes }),
			},
			{ new: true }
		).populate('company_id', 'name logo_url');

		return ApiSerializer.success(updatedJob, 'Job updated successfully');
	} catch {
		return ApiSerializer.error('Failed to update job');
	}
}

export async function DELETE(
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

		await Job.findByIdAndUpdate(id, { deletedAt: new Date() });

		return ApiSerializer.success(null, 'Job deleted successfully');
	} catch {
		return ApiSerializer.error('Failed to delete job');
	}
}
