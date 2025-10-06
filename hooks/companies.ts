"use client"

import { useApi, apiCall } from '@/lib/api'

interface Company {
	_id: string;
	name: string;
	industry?: string;
	location?: string;
	website?: string;
	description?: string;
	contact_email?: string;
	contact_phone?: string;
	logo_url?: string;
	createdAt: string;
	updatedAt: string;
}

interface CompanyListResponse {
	data: Company[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export const useCompanies = (params?: {
	page?: number;
	limit?: number;
	search?: string;
}) => {
	const queryParams = new URLSearchParams();
	if (params?.page) queryParams.set('page', params.page.toString());
	if (params?.limit) queryParams.set('limit', params.limit.toString());
	if (params?.search) queryParams.set('search', params.search);

	const url = `/api/companies${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

	return useApi(url);
};

export const useCompany = (id: string) => {
	return useApi(`/api/companies/${id}`);
};

export const createCompany = async (data: {
	name: string;
	industry?: string;
	location?: string;
	website?: string;
	description?: string;
	contact_email?: string;
	contact_phone?: string;
	logo_url?: string;
}) => {
	return apiCall('/api/companies', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const updateCompany = async (id: string, data: {
	name?: string;
	industry?: string;
	location?: string;
	website?: string;
	description?: string;
	contact_email?: string;
	contact_phone?: string;
	logo_url?: string;
}) => {
	return apiCall(`/api/companies/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
};

export const deleteCompany = async (id: string) => {
	return apiCall(`/api/companies/${id}`, {
		method: 'DELETE',
	});
};
