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
	IconArrowRight,
	IconListCheck,
	IconCircleDashed,
} from '@tabler/icons-react';
import { SimpleTable } from '@/components/simple-table';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { JobStatsChart } from '@/components/dashboard/job-stats-chart';
import { RecentEvents } from '@/components/dashboard/recent-events';

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
			render: (value: string, row: Job) => (
				<div>
					<div className="font-medium">
						{String(value).length > 50
							? String(value).slice(0, 50) + '...'
							: value}
					</div>
					<div className="text-xs text-muted-foreground">
						{row.company_name}
					</div>
				</div>
			),
		},
		{
			key: 'job_type',
			header: 'Type',
			render: (value: unknown, row: Job) => (
				<div>
					<div className="font-medium">
						<span className="max-w-xs truncate block capitalize">
							{value ? String(value).replace('-', ' ') : '-'}
						</span>
					</div>
					<div className="text-xs text-muted-foreground">
						{row.work_mode ?? ''}
					</div>
				</div>
			),
		},
		// {
		// 	key: 'work_mode',
		// 	header: 'Mode',
		// 	render: (value: unknown) => (
		// 		<span className="max-w-xs truncate block capitalize">
		// 			{value ? String(value) : '-'}
		// 		</span>
		// 	),
		// },
		{
			key: 'deadline',
			header: 'Deadline',
			render: (value: unknown) =>
				value ? new Date(String(value)).toLocaleDateString() : '-',
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
				<p className="text-destructive">Failed to load dashboard data</p>
			</div>
		);
	}

	const stats = data?.stats;
	const eventStats = data?.eventStats;
	const recentJobs = data?.recentNotAppliedJobs || [];
	const interviewingJobs = data?.interviewingJobs || [];
	const recentEvents = data?.recentEvents || [];

	return (
		<div className="space-y-6">
			{/* Stats Cards - Minimalistic Black/White Design */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{/* Applied Jobs Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300 hover:shadow-lg">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -mr-16 -mt-16" />
					<CardHeader className="space-y-0 pb-4">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Applied
								</CardTitle>
								<div className="text-4xl font-bold tracking-tight">
									{stats?.applied || 0}
								</div>
							</div>
							<div className="rounded-xl bg-foreground text-background p-3 group-hover:scale-110 transition-transform duration-300">
								<IconChecks className="h-5 w-5" strokeWidth={2.5} />
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<div className="h-px flex-1 bg-border" />
							<span>Jobs submitted</span>
						</div>
					</CardContent>
				</Card>

				{/* Yet to Apply Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300 hover:shadow-lg">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -mr-16 -mt-16" />
					<CardHeader className="space-y-0 pb-4">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Pending
								</CardTitle>
								<div className="text-4xl font-bold tracking-tight">
									{stats?.notApplied || 0}
								</div>
							</div>
							<div className="rounded-xl bg-foreground text-background p-3 group-hover:scale-110 transition-transform duration-300">
								<IconBriefcase className="h-5 w-5" strokeWidth={2.5} />
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<div className="h-px flex-1 bg-border" />
							<span>Awaiting action</span>
						</div>
					</CardContent>
				</Card>

				{/* Deadline Today Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300 hover:shadow-lg">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -mr-16 -mt-16" />
					<CardHeader className="space-y-0 pb-4">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Due Today
								</CardTitle>
								<div className="text-4xl font-bold tracking-tight">
									{stats?.deadlineToday || 0}
								</div>
							</div>
							<div className="rounded-xl bg-foreground text-background p-3 group-hover:scale-110 transition-transform duration-300">
								<IconClock className="h-5 w-5" strokeWidth={2.5} />
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<div className="h-px flex-1 bg-border" />
							<span>Urgent attention</span>
						</div>
					</CardContent>
				</Card>

				{/* Deadline This Week Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300 hover:shadow-lg">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -mr-16 -mt-16" />
					<CardHeader className="space-y-0 pb-4">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Deadline in Week
								</CardTitle>
								<div className="text-4xl font-bold tracking-tight">
									{stats?.deadlineWeek || 0}
								</div>
							</div>
							<div className="rounded-xl bg-foreground text-background p-3 group-hover:scale-110 transition-transform duration-300">
								<IconCalendar className="h-5 w-5" strokeWidth={2.5} />
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<div className="h-px flex-1 bg-border" />
							<span>Next 7 days</span>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Jobs and Interviewing Jobs - Side by Side */}
			<div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
				{/* Recent Jobs Not Applied */}
				<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300 flex flex-col">
					<div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-foreground/5 to-transparent rounded-full -ml-20 -mb-20" />
					<CardHeader className="border-b shrink-0">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<CardTitle className="text-lg font-semibold tracking-tight">
									Recent Jobs
								</CardTitle>
								<p className="text-xs text-muted-foreground mt-1">
									Jobs saved but not yet applied
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => router.push('/app/jobs?status=saved')}
									className="gap-1">
									View All
									<IconArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 flex-1">
						{recentJobs.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<div className="rounded-full bg-muted p-4 mb-4">
									<IconBriefcase className="h-8 w-8 text-muted-foreground" />
								</div>
								<p className="text-sm font-medium mb-1">No saved jobs</p>
								<p className="text-xs text-muted-foreground max-w-xs">
									Start adding jobs to track your applications
								</p>
							</div>
						) : (
							<SimpleTable
								data={recentJobs}
								columns={columns}
								showPagination={false}
							/>
						)}
					</CardContent>
				</Card>

				{/* Interviewing Jobs */}
				<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300 flex flex-col">
					<div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-foreground/5 to-transparent rounded-full -mr-20 -mb-20" />
					<CardHeader className="border-b shrink-0">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<CardTitle className="text-lg font-semibold tracking-tight">
									Interviewing
								</CardTitle>
								<p className="text-xs text-muted-foreground mt-1">
									Active interview processes
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => router.push('/app/jobs?status=interviewing')}
									className="gap-1">
									View All
									<IconArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 flex-1">
						{interviewingJobs.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<div className="rounded-full bg-muted p-4 mb-4">
									<IconChecks className="h-8 w-8 text-muted-foreground" />
								</div>
								<p className="text-sm font-medium mb-1">No interviews yet</p>
								<p className="text-xs text-muted-foreground max-w-xs">
									Keep applying to get interview opportunities!
								</p>
							</div>
						) : (
							<SimpleTable
								data={interviewingJobs}
								columns={columns}
								showPagination={false}
							/>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Recent Events Section - Optimized Layout */}
			<div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
				{/* Event Statistics */}
				{eventStats && (
					<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300">
						<div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -ml-16 -mt-16" />
						<CardHeader className="border-b">
							<CardTitle className="text-lg font-semibold tracking-tight">
								Event Stats
							</CardTitle>
							<p className="text-xs text-muted-foreground mt-1">
								Overview of your events
							</p>
						</CardHeader>
						<CardContent className="pt-6 space-y-3">
							<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
								<div className="flex items-center gap-3">
									<div className="rounded-lg bg-foreground text-background p-2">
										<IconCalendar className="h-4 w-4" strokeWidth={2.5} />
									</div>
									<span className="text-sm font-medium">Total Events</span>
								</div>
								<div className="text-2xl font-bold">{eventStats.total}</div>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
								<div className="flex items-center gap-3">
									<div className="rounded-lg bg-green-600 text-white p-2">
										<IconChecks className="h-4 w-4" strokeWidth={2.5} />
									</div>
									<span className="text-sm font-medium">Completed</span>
								</div>
								<div className="text-2xl font-bold">{eventStats.completed}</div>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
								<div className="flex items-center gap-3">
									<div className="rounded-lg bg-orange-600 text-white p-2">
										<IconCircleDashed className="h-4 w-4" strokeWidth={2.5} />
									</div>
									<span className="text-sm font-medium">Pending</span>
								</div>
								<div className="text-2xl font-bold">{eventStats.pending}</div>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
								<div className="flex items-center gap-3">
									<div className="rounded-lg bg-blue-600 text-white p-2">
										<IconListCheck className="h-4 w-4" strokeWidth={2.5} />
									</div>
									<span className="text-sm font-medium">Upcoming</span>
								</div>
								<div className="text-2xl font-bold">{eventStats.upcoming}</div>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Recent Events List */}
				<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300 lg:col-span-2">
					<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-foreground/5 to-transparent rounded-full -mr-20 -mt-20" />
					<CardHeader className="border-b">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<CardTitle className="text-lg font-semibold tracking-tight">
									Recent Events
								</CardTitle>
								<p className="text-xs text-muted-foreground mt-1">
									Your latest job-related activities
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => router.push('/app/events')}
									className="gap-1">
									View All
									<IconArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-6 pb-6">
						<RecentEvents events={recentEvents} />
					</CardContent>
				</Card>
			</div>

			{/* Chart Section */}
			<Card className="group relative overflow-hidden border-2 hover:border-foreground transition-all duration-300">
				<div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -ml-20 -mt-20" />
				<CardHeader className="border-b">
					<CardTitle className="text-lg font-semibold tracking-tight">
						Application Overview
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-6">
					<JobStatsChart />
				</CardContent>
			</Card>
		</div>
	);
}
