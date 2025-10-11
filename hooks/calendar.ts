"use client"

import { useApi } from '@/lib/api';

export interface CalendarJob {
	_id: string;
	title: string;
	company_name: string;
	status: string;
	deadline?: string;
	applied_date?: string;
	location?: string;
	job_type?: string;
	work_mode?: string;
}

export function useCalendarJobs() {
	const { data, error, isLoading, mutate } = useApi('/api/calendar/jobs');

	return {
		data: data?.data as CalendarJob[] | undefined,
		error,
		isLoading,
		mutate
	};
}
