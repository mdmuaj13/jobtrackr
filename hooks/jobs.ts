"use client"

import { useApi, apiCall } from '@/lib/api'

interface Job {
	_id: string;
	title: string;
	description?: string;
	company_name: string;
	company_id?: {
		_id: string;
		name: string;
		logo_url?: string;
	};
	location?: string;
	job_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
	work_mode?: 'remote' | 'hybrid' | 'onsite';
	salary_min?: number;
	salary_max?: number;
	salary_currency?: string;
	job_url?: string;
	company_url?: string;
	linkedin_url?: string;
	application_link?: string;
	application_process?: string;
	status: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted' | 'withdrawn';
	deadline?: string;
	special_requirements?: string;
	skills?: string[];
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

interface JobListResponse {
	data: Job[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export const useJobs = (params?: {
	page?: number;
	limit?: number;
	search?: string;
	status?: string;
	job_type?: string;
	work_mode?: string;
}) => {
	const queryParams = new URLSearchParams();
	if (params?.page) queryParams.set('page', params.page.toString());
	if (params?.limit) queryParams.set('limit', params.limit.toString());
	if (params?.search) queryParams.set('search', params.search);
	if (params?.status) queryParams.set('status', params.status);
	if (params?.job_type) queryParams.set('job_type', params.job_type);
	if (params?.work_mode) queryParams.set('work_mode', params.work_mode);

	const url = `/api/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

	return useApi(url);
};

export const useJob = (id: string) => {
	return useApi(`/api/jobs/${id}`);
};

export const createJob = async (data: {
	title: string;
	description?: string;
	company_name: string;
	company_id?: string;
	location?: string;
	job_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
	work_mode?: 'remote' | 'hybrid' | 'onsite';
	salary_min?: number;
	salary_max?: number;
	salary_currency?: string;
	job_url?: string;
	company_url?: string;
	linkedin_url?: string;
	application_link?: string;
	application_process?: string;
	status?: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted' | 'withdrawn';
	deadline?: string;
	special_requirements?: string;
	skills?: string[];
	notes?: string;
}) => {
	return apiCall('/api/jobs', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const updateJob = async (id: string, data: {
	title?: string;
	description?: string;
	company_name?: string;
	company_id?: string;
	location?: string;
	job_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
	work_mode?: 'remote' | 'hybrid' | 'onsite';
	salary_min?: number;
	salary_max?: number;
	salary_currency?: string;
	job_url?: string;
	company_url?: string;
	linkedin_url?: string;
	application_link?: string;
	application_process?: string;
	status?: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted' | 'withdrawn';
	deadline?: string;
	special_requirements?: string;
	skills?: string[];
	notes?: string;
}) => {
	return apiCall(`/api/jobs/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
};

export const deleteJob = async (id: string) => {
	return apiCall(`/api/jobs/${id}`, {
		method: 'DELETE',
	});
};
