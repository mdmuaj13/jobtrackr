import connectDB from '@/lib/db';
import Job from '@/models/Job';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { createJobSchema } from '@/lib/validations/job';
import {
	logActivity,
	getActivityDetailsForStatus,
} from '@/lib/helpers/activity-logger';

export async function GET(request: NextRequest) {
	try {
		const { error: authError, user } = await authenticateToken(request);
		console.log(authError);
		if (authError) return authError;

		await connectDB();

		const searchParams = request.nextUrl.searchParams;
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const search = searchParams.get('search') || '';
		const status = searchParams.get('status') || '';
		const job_type = searchParams.get('job_type') || '';
		const work_mode = searchParams.get('work_mode') || '';

		const skip = (page - 1) * limit;

		const query: Record<string, unknown> = { deletedAt: null, user_id: user?.id };

		if (search) {
			query.$or = [
				{ title: { $regex: search, $options: 'i' } },
				{ company_name: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } },
				{ location: { $regex: search, $options: 'i' } },
			];
		}

		if (status) {
			query.status = status;
		}

		if (job_type) {
			query.job_type = job_type;
		}

		if (work_mode) {
			query.work_mode = work_mode;
		}

		const jobs = await Job.find(query)
			.populate('company_id', 'name logo_url')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		const total = await Job.countDocuments(query);

		const meta = {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		};

		return ApiSerializer.success(jobs, 'Jobs retrieved successfully', meta);
	} catch {
		return ApiSerializer.error('Failed to retrieve jobs');
	}
}

export async function POST(request: NextRequest) {
	try {
		const { error: authError, user } = await authenticateToken(request);
		console.log(authError);
		if (authError) return authError;

		await connectDB();

		const body = await request.json();

		const validation = createJobSchema.safeParse(body);
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

		const job = await Job.create({
			title,
			description,
			company_name,
			company_id: company_id || undefined,
			location,
			job_type,
			work_mode,
			salary_min,
			salary_max,
			salary_currency,
			job_url: job_url || undefined,
			company_url: company_url || undefined,
			linkedin_url: linkedin_url || undefined,
			application_link: application_link || undefined,
			application_process,
			status: status || 'saved',
			deadline: deadline ? new Date(deadline) : undefined,
			special_requirements,
			skills,
			notes,
			user_id: user?.id,
		});

		// Auto-log initial activity when job is created
		const activityDetails = getActivityDetailsForStatus(
			undefined,
			status || 'saved'
		);
		await logActivity({
			job_id: job._id,
			user_id: user?.id,
			activity_type: activityDetails.activity_type,
			title: activityDetails.title,
			description: activityDetails.description,
		});

		return ApiSerializer.created(job, 'Job created successfully');
	} catch {
		return ApiSerializer.error('Failed to create job');
	}
}
