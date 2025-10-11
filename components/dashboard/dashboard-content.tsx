'use client';

import { useDashboardStats } from '@/hooks/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
	IconBriefcase,
	IconCalendar,
	IconChecks,
	IconClock,
} from '@tabler/icons-react';
import { SimpleTable } from '@/components/simple-table';
import { useRouter } from 'next/navigation';
import { JobStatsChart } from '@/components/dashboard/job-stats-chart';

interface Job {
	_id: string;
	title: string;
	company_name: string;
	location?: string;
	job_type?: string;
	applied_date?: string;
	deadline?: string;
	createdAt: string;
	status?: string;
	work_mode?: string;
}

export function DashboardContent() {
	const { data, isLoading, error } = useDashboardStats();
	const router = useRouter();

	const columns = [
		{
			key: 'title',
			header: 'Job Title',
			render: (value: unknown, row: Job) => (
				<div>
					<div className="font-medium">{String(value)}</div>
					<div className="text-xs text-muted-foreground">
						{row.company_name}
					</div>
				</div>
			),
		},
		{
			key: 'job_type',
			header: 'Type',
			render: (value: unknown) => (
				<span className="max-w-xs truncate block capitalize">
					{value ? String(value).replace('-', ' ') : '-'}
				</span>
			),
		},
		{
			key: 'work_mode',
			header: 'Mode',
			render: (value: unknown) => (
				<span className="max-w-xs truncate block capitalize">
					{value ? String(value) : '-'}
				</span>
			),
		},
		{
			key: 'deadline',
			header: 'Deadline',
			render: (value: unknown) =>
				value ? new Date(String(value)).toLocaleDateString() : '-',
		},
	];

	const actions = [
		{
			label: 'View',
			onClick: () => {
				router.push('/app/jobs');
			},
			variant: 'secondary' as const,
		},
	];

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{[...Array(4)].map((_, i) => (
						<Card key={i}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<Skeleton className="h-4 w-24" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-8 w-16" />
							</CardContent>
						</Card>
					))}
				</div>
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-48" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-64 w-full" />
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<p className="text-red-500">Failed to load dashboard data</p>
			</div>
		);
	}

	const stats = data?.stats;
	const recentJobs = data?.recentNotAppliedJobs || [];
	const rejectedJobs = data?.rejectedJobs || [];

	return (
		<div className="space-y-6">
			{/* Stats Cards and Pie Chart Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-500/5 to-transparent">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Applied Jobs</CardTitle>
						<div className="rounded-full bg-green-500/20 p-2">
							<IconChecks className="h-4 w-4 text-green-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-green-600">
							{stats?.applied || 0}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Jobs you&apos;ve applied to
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-500/5 to-transparent">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Yet to Apply</CardTitle>
						<div className="rounded-full bg-blue-500/20 p-2">
							<IconBriefcase className="h-4 w-4 text-blue-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-blue-600">
							{stats?.notApplied || 0}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Saved jobs not applied
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-500/5 to-transparent">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Deadline Today
						</CardTitle>
						<div className="rounded-full bg-orange-500/20 p-2">
							<IconClock className="h-4 w-4 text-orange-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-orange-600">
							{stats?.deadlineToday || 0}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Applications due today
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-500/5 to-transparent">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Deadline This Week
						</CardTitle>
						<div className="rounded-full bg-purple-500/20 p-2">
							<IconCalendar className="h-4 w-4 text-purple-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-purple-600">
							{stats?.deadlineWeek || 0}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Due within 7 days
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Not Applied Jobs Table and Chart */}
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
				<div className="lg:col-span-2 order-2 lg:order-1">
					<Card className="border-t-2 border-t-[hsl(var(--chart-3))]">
						<CardHeader className="bg-gradient-to-r from-[hsl(var(--chart-3))]/5 to-transparent">
							<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
								<span className="h-5 w-1 bg-[hsl(var(--chart-3))] rounded-full"></span>
								Recent Jobs Not Applied
							</CardTitle>
						</CardHeader>
						<CardContent className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
							{recentJobs.length === 0 ? (
								<p className="text-sm text-muted-foreground text-center py-8">
									No saved jobs found. Start adding jobs to track!
								</p>
							) : (
								<SimpleTable
									data={recentJobs}
									columns={columns}
									actions={actions}
									showPagination={false}
								/>
							)}
						</CardContent>
					</Card>
				</div>
				<div className="lg:col-span-1 order-1 lg:order-2">
					<JobStatsChart />
				</div>
			</div>

			{/* Rejected Jobs Table */}
			<Card className="border-t-2 border-t-destructive">
				<CardHeader className="bg-gradient-to-r from-destructive/5 to-transparent">
					<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
						<span className="h-5 w-1 bg-destructive rounded-full"></span>
						Rejected Jobs
					</CardTitle>
				</CardHeader>
				<CardContent className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
					{rejectedJobs.length === 0 ? (
						<p className="text-sm text-muted-foreground text-center py-8">
							No rejected jobs found.
						</p>
					) : (
						<SimpleTable
							data={rejectedJobs}
							columns={columns}
							actions={actions}
							showPagination={false}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
