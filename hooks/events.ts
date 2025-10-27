"use client"

import { useApi, apiCall } from '@/lib/api'

interface Event {
	_id: string;
	job_id: string;
	title?: string;
	content: string;
	schedule_date?: string;
	is_checked: boolean;
	createdAt: string;
	updatedAt: string;
}

interface EventListResponse {
	data: Event[];
	meta?: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export const useEvents = (params?: {
	job_id?: string;
	page?: number;
	limit?: number;
	is_checked?: boolean;
}) => {
	const queryParams = new URLSearchParams();
	if (params?.job_id) queryParams.set('job_id', params.job_id);
	if (params?.page) queryParams.set('page', params.page.toString());
	if (params?.limit) queryParams.set('limit', params.limit.toString());
	if (params?.is_checked !== undefined) queryParams.set('is_checked', params.is_checked.toString());

	const url = `/api/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

	return useApi(url);
};

export const useEvent = (id: string) => {
	return useApi(`/api/events/${id}`);
};

export const createEvent = async (data: {
	job_id: string;
	title?: string;
	content: string;
	schedule_date?: string;
	is_checked?: boolean;
}) => {
	return apiCall('/api/events', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const updateEvent = async (id: string, data: {
	job_id?: string;
	title?: string;
	content?: string;
	schedule_date?: string;
	is_checked?: boolean;
}) => {
	return apiCall(`/api/events/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
};

export const deleteEvent = async (id: string) => {
	return apiCall(`/api/events/${id}`, {
		method: 'DELETE',
	});
};
