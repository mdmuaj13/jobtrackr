import connectDB from '@/lib/db';
import Company from '@/models/Company';
import { ApiSerializer } from '@/types';
import { NextRequest } from 'next/server';
import { authenticateToken } from '@/lib/auth';
import { updateCompanySchema } from '@/lib/validations/company';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		await connectDB();

		const company = await Company.findOne({
			_id: id,
			deletedAt: null,
		});

		if (!company) {
			return ApiSerializer.notFound('Company not found');
		}

		return ApiSerializer.success(company, 'Company retrieved successfully');
	} catch {
		return ApiSerializer.error('Failed to retrieve company');
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

		const validation = updateCompanySchema.safeParse(body);
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

		const company = await Company.findOne({ _id: id, deletedAt: null });

		if (!company) {
			return ApiSerializer.notFound('Company not found');
		}

		const updatedCompany = await Company.findByIdAndUpdate(
			id,
			{
				...(name !== undefined && { name }),
				...(industry !== undefined && { industry }),
				...(location !== undefined && { location }),
				...(website !== undefined && { website: website || undefined }),
				...(description !== undefined && { description }),
				...(contact_email !== undefined && { contact_email: contact_email || undefined }),
				...(contact_phone !== undefined && { contact_phone }),
				...(logo_url !== undefined && { logo_url: logo_url || undefined }),
			},
			{ new: true }
		);

		return ApiSerializer.success(updatedCompany, 'Company updated successfully');
	} catch {
		return ApiSerializer.error('Failed to update company');
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

		const company = await Company.findOne({ _id: id, deletedAt: null });

		if (!company) {
			return ApiSerializer.notFound('Company not found');
		}

		await Company.findByIdAndUpdate(id, { deletedAt: new Date() });

		return ApiSerializer.success(null, 'Company deleted successfully');
	} catch {
		return ApiSerializer.error('Failed to delete company');
	}
}
