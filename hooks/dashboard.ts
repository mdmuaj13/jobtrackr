import { useApi } from '@/lib/api';

interface DashboardStats {
	applied: number;
	notApplied: number;
	deadlineToday: number;
	deadlineWeek: number;
}

interface RecentJob {
	_id: string;
	title: string;
	company_name: string;
	location?: string;
	job_type?: string;
	deadline?: string;
	createdAt: string;
}

interface PopulatedJob {
	_id: string;
	title: string;
	company_name: string;
	status: string;
}

interface RecentEvent {
	_id: string;
	job_id: PopulatedJob;
	title?: string;
	content: string;
	schedule_date?: string;
	is_checked: boolean;
	createdAt: string;
	updatedAt: string;
}

interface DashboardData {
	stats: DashboardStats;
	recentNotAppliedJobs: RecentJob[];
	interviewingJobs: RecentJob[];
	recentEvents: RecentEvent[];
}

export function useDashboardStats() {
	const { data, error, isLoading, mutate } = useApi('/api/dashboard/stats');

	return {
		data: data?.data,
		error,
		isLoading,
		mutate
	};
}
