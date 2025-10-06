import connectDB from '@/lib/db';
import Company from '@/models/Company';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { createCompanySchema } from '@/lib/validations/company';

export async function GET(request: NextRequest) {
	try {
		await connectDB();

		const searchParams = request.nextUrl.searchParams;
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const search = searchParams.get('search') || '';

		const skip = (page - 1) * limit;

		const query: Record<string, unknown> = { deletedAt: null };

		if (search) {
			query.$or = [
				{ name: { $regex: search, $options: 'i' } },
				{ industry: { $regex: search, $options: 'i' } },
				{ location: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } },
				{ contact_email: { $regex: search, $options: 'i' } },
			];
		}

		const companies = await Company.find(query)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		const total = await Company.countDocuments(query);

		const meta = {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		};

		return ApiSerializer.success(
			companies,
			'Companies retrieved successfully',
			meta
		);
	} catch {
		return ApiSerializer.error('Failed to retrieve companies');
	}
}

export async function POST(request: NextRequest) {
	try {
		const { error: authError } = await authenticateToken(request);
		if (authError) return authError;

		await connectDB();

		const body = await request.json();

		const validation = createCompanySchema.safeParse(body);
		if (!validation.success) {
			return ApiSerializer.error(validation.error.issues[0].message, 400);
		}

		const {
			name,
			industry,
			location,
			website,
			description,
			contact_email,
			contact_phone,
			logo_url,
		} = validation.data;

		const company = await Company.create({
			name,
			industry,
			location,
			website: website || undefined,
			description,
			contact_email: contact_email || undefined,
			contact_phone,
			logo_url: logo_url || undefined,
		});

		return ApiSerializer.created(company, 'Company created successfully');
	} catch {
		return ApiSerializer.error('Failed to create company');
	}
}
