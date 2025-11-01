'use client';

import { useDashboardStats } from '@/hooks/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
	IconBriefcase,
	IconCalendar,
	IconChecks,
	IconClock,
	IconArrowRight,
	IconListCheck,
	IconCircleDashed,
	IconClockPause,
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
			<div className="space-y-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{[...Array(4)].map((_, i) => (
						<Card key={i} className="border-2 overflow-hidden">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
								<div className="space-y-2">
									<Skeleton className="h-3 w-20" />
									<Skeleton className="h-10 w-16" />
								</div>
								<Skeleton className="h-14 w-14 rounded-2xl" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-2 w-full rounded-full" />
							</CardContent>
						</Card>
					))}
				</div>
				<div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
					{[...Array(2)].map((_, i) => (
						<Card key={i} className="border-2">
							<CardHeader className="border-b-2">
								<Skeleton className="h-5 w-32" />
							</CardHeader>
							<CardContent className="h-48 flex items-center justify-center">
								<Skeleton className="h-3 w-3/4" />
							</CardContent>
						</Card>
					))}
				</div>
				<div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
					<Card className="border-2">
						<CardHeader className="border-b-2">
							<Skeleton className="h-5 w-28" />
						</CardHeader>
						<CardContent className="space-y-3 py-4">
							{[...Array(4)].map((_, i) => (
								<div key={i} className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<Skeleton className="h-6 w-6 rounded-lg" />
										<Skeleton className="h-2.5 w-16" />
									</div>
									<Skeleton className="h-5 w-8" />
								</div>
							))}
						</CardContent>
					</Card>
					<Card className="border-2 lg:col-span-2">
						<CardHeader className="border-b-2">
							<Skeleton className="h-5 w-32" />
						</CardHeader>
						<CardContent className="h-48 flex items-center justify-center">
							<Skeleton className="h-3 w-3/4" />
						</CardContent>
					</Card>
				</div>
				<Card className="border-2">
					<CardHeader className="border-b-2">
						<Skeleton className="h-5 w-36" />
					</CardHeader>
					<CardContent className="pt-6 h-48 flex items-center justify-center">
						<Skeleton className="h-3 w-3/4" />
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
		<div className="relative space-y-8">
			{/* Subtle Background Blobs */}
			<div className="absolute top-20 left-1/4 w-64 h-64 bg-chart-1/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
			<div className="absolute bottom-20 right-1/4 w-72 h-72 bg-chart-2/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
			<div className="absolute top-1/2 right-1/3 w-64 h-64 bg-chart-3/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

			{/* Stats Cards - Colorful Design */}
			<div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{/* Applied Jobs Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-chart-1 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-chart-1/10 to-transparent">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-1/30 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500" />
					<CardHeader className="space-y-0 pb-4 relative">
						<div className="flex items-start justify-between">
							<div className="space-y-2">
								<CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
									Applied
								</CardTitle>
								<div className="text-5xl font-bold tracking-tight">
									{stats?.applied || 0}
								</div>
							</div>
							<div className="rounded-2xl bg-chart-1 shadow-lg p-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
								<IconChecks
									className="h-6 w-6 text-primary"
									strokeWidth={2.5}
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0 relative">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<div className="h-0.5 flex-1 bg-chart-1/40 rounded-full" />
							<span>Jobs submitted</span>
						</div>
					</CardContent>
				</Card>

				{/* Interviewing Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-chart-2 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-chart-2/10 to-transparent">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-2/30 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500" />
					<CardHeader className="space-y-0 pb-4 relative">
						<div className="flex items-start justify-between">
							<div className="space-y-2">
								<CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
									Interviewing
								</CardTitle>
								<div className="text-5xl font-bold tracking-tight">
									{stats?.interviewing || 0}
								</div>
							</div>
							<div className="rounded-2xl bg-chart-2 shadow-lg p-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
								<IconChecks
									className="h-6 w-6 text-primary"
									strokeWidth={2.5}
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0 relative">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<div className="h-0.5 flex-1 bg-chart-2/40 rounded-full" />
							<span>Active interviews</span>
						</div>
					</CardContent>
				</Card>

				{/* Yet to Apply Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-chart-4 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-chart-4/10 to-transparent">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-4/30 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500" />
					<CardHeader className="space-y-0 pb-4 relative">
						<div className="flex items-start justify-between">
							<div className="space-y-2">
								<CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
									Pending
								</CardTitle>
								<div className="text-5xl font-bold tracking-tight">
									{stats?.notApplied || 0}
								</div>
							</div>
							<div className="rounded-2xl bg-chart-4 shadow-lg p-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
								<IconClockPause
									className="h-6 w-6 text-primary"
									strokeWidth={2.5}
								/>
								{/* IconClockPause IconBriefcase*/}
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0 relative">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<div className="h-0.5 flex-1 bg-chart-4/40 rounded-full" />
							<span>Awaiting action</span>
						</div>
					</CardContent>
				</Card>

				{/* Deadline Today Card */}
				<Card className="group relative overflow-hidden border-2 hover:border-destructive transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-destructive/10 to-transparent">
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/30 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500" />
					<CardHeader className="space-y-0 pb-4 relative">
						<div className="flex items-start justify-between">
							<div className="space-y-2">
								<CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
									Deadline Today
								</CardTitle>
								<div className="text-5xl font-bold tracking-tight">
									{stats?.deadlineToday || 0}
								</div>
							</div>
							<div className="rounded-2xl bg-destructive shadow-lg p-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
								<IconClock className="h-6 w-6 text-destructive-foreground" strokeWidth={2.5} />
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0 relative">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<div className="h-0.5 flex-1 bg-destructive/40 rounded-full" />
							<span>Urgent attention</span>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Jobs and Interviewing Jobs - Side by Side */}
			<div className="relative z-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
				{/* Recent Jobs Not Applied */}
				<Card className="group relative overflow-hidden border-2 hover:border-chart-1 transition-all duration-300 flex flex-col bg-gradient-to-br from-chart-1/5 to-transparent">
					<div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-chart-1/20 to-transparent rounded-full -ml-20 -mb-20 group-hover:scale-110 transition-transform duration-500" />
					<CardHeader className="border-b-2 border-chart-1/20 shrink-0 relative">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
									<div className="w-2 h-8 bg-chart-1 rounded-full"></div>
									Recent Jobs
								</CardTitle>
								<p className="text-sm text-muted-foreground mt-2 ml-4">
									Jobs saved but not yet applied
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => router.push('/app/jobs?status=saved')}
									className="gap-1 hover:bg-chart-1/20">
									View All
									<IconArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 flex-1 relative">
						{recentJobs.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-16 text-center">
								<div className="relative mb-6">
									<div className="absolute inset-0 bg-chart-1/30 rounded-full blur-2xl"></div>
									<div className="relative rounded-2xl bg-gradient-to-br from-chart-1 to-chart-5 p-5 shadow-xl animate-float">
										<IconBriefcase
											className="h-10 w-10 text-primary"
											strokeWidth={2}
										/>
									</div>
								</div>
								<p className="text-base font-bold mb-2 text-foreground">
									No saved jobs yet
								</p>
								<p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
									Start adding jobs to track your applications and never miss a
									deadline
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
				<Card className="group relative overflow-hidden border-2 hover:border-chart-2 transition-all duration-300 flex flex-col bg-gradient-to-br from-chart-2/5 to-transparent">
					<div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-chart-2/20 to-transparent rounded-full -mr-20 -mb-20 group-hover:scale-110 transition-transform duration-500" />
					<CardHeader className="border-b-2 border-chart-2/20 shrink-0 relative">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
									<div className="w-2 h-8 bg-chart-2 rounded-full"></div>
									Interviewing
								</CardTitle>
								<p className="text-sm text-muted-foreground mt-2 ml-4">
									Active interview processes
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => router.push('/app/jobs?status=interviewing')}
									className="gap-1 hover:bg-chart-2/20">
									View All
									<IconArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 flex-1 relative">
						{interviewingJobs.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-16 text-center">
								<div className="relative mb-6">
									<div className="absolute inset-0 bg-chart-2/30 rounded-full blur-2xl"></div>
									<div className="relative rounded-2xl bg-gradient-to-br from-chart-2 to-chart-5 p-5 shadow-xl animate-float animation-delay-2000">
										<IconChecks
											className="h-10 w-10 text-primary"
											strokeWidth={2}
										/>
									</div>
								</div>
								<p className="text-base font-bold mb-2 text-foreground">
									No interviews yet
								</p>
								<p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
									Keep applying to get interview opportunities and land your
									dream job!
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
			<div className="relative z-10 grid gap-6 grid-cols-1 lg:grid-cols-3">
				{/* Event Statistics */}
				{eventStats && (
					<Card className="group relative overflow-hidden border-2 hover:border-chart-4 transition-all duration-300 bg-gradient-to-br from-chart-4/5 to-transparent hover:shadow-xl">
						<div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-chart-4/20 to-transparent rounded-full -ml-16 -mt-16 group-hover:scale-125 transition-transform duration-500" />
						<CardHeader className="border-b-2 border-chart-4/20 relative">
							<CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
								<div className="w-2 h-8 bg-chart-4 rounded-full"></div>
								Job Event
							</CardTitle>
							<p className="text-sm text-muted-foreground mt-2 ml-4">
								Overview of your job events
							</p>
						</CardHeader>
						<CardContent className="pt-6 space-y-2 relative">
							<div className="group/item flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-chart-4/20 to-transparent border-2 border-chart-4/30 hover:border-chart-4 transition-all hover:shadow-lg">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-chart-4 shadow-md p-2.5 group-hover/item:scale-110 transition-transform">
										<IconCalendar
											className="h-5 w-5 text-primary"
											strokeWidth={2.5}
										/>
									</div>
									<span className="text-sm font-semibold">Total Events</span>
								</div>
								<div className="text-3xl font-bold">{eventStats.total}</div>
							</div>

							<div className="group/item flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-chart-1/20 to-transparent border-2 border-chart-1/30 hover:border-chart-1 transition-all hover:shadow-lg">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-chart-1 shadow-md p-2.5 group-hover/item:scale-110 transition-transform">
										<IconChecks
											className="h-5 w-5 text-primary"
											strokeWidth={2.5}
										/>
									</div>
									<span className="text-sm font-semibold">Completed</span>
								</div>
								<div className="text-3xl font-bold">{eventStats.completed}</div>
							</div>

							<div className="group/item flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-destructive/10 to-transparent border-2 border-destructive/30 hover:border-destructive transition-all hover:shadow-lg">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-destructive shadow-md p-2.5 group-hover/item:scale-110 transition-transform">
										<IconCircleDashed
											className="h-5 w-5 text-destructive-foreground"
											strokeWidth={2.5}
										/>
									</div>
									<span className="text-sm font-semibold">Pending</span>
								</div>
								<div className="text-3xl font-bold">{eventStats.pending}</div>
							</div>

							<div className="group/item flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-chart-2/20 to-transparent border-2 border-chart-2/30 hover:border-chart-2 transition-all hover:shadow-lg">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-chart-2 shadow-md p-2.5 group-hover/item:scale-110 transition-transform">
										<IconListCheck
											className="h-5 w-5 text-primary"
											strokeWidth={2.5}
										/>
									</div>
									<span className="text-sm font-semibold">Upcoming</span>
								</div>
								<div className="text-3xl font-bold">{eventStats.upcoming}</div>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Recent Events List */}
				<Card className="group relative overflow-hidden border-2 hover:border-chart-3 transition-all duration-300 lg:col-span-2 bg-gradient-to-br from-chart-3/5 to-transparent hover:shadow-xl">
					<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-chart-3/20 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-500" />
					<CardHeader className="border-b-2 border-chart-3/20 relative">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
									<div className="w-2 h-8 bg-chart-3 rounded-full"></div>
									Recent Events
								</CardTitle>
								<p className="text-sm text-muted-foreground mt-2 ml-4">
									Your latest job-related activities
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => router.push('/app/events')}
									className="gap-1 hover:bg-chart-3/20">
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
			<Card className="group relative z-10 overflow-hidden border-2 hover:border-chart-5 transition-all duration-300 bg-gradient-to-br from-chart-5/5 to-transparent hover:shadow-xl">
				<div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-chart-5/20 to-transparent rounded-full -ml-20 -mt-20 group-hover:scale-125 transition-transform duration-500" />
				<CardHeader className="border-b-2 border-chart-5/20 relative">
					<CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
						<div className="w-2 h-8 bg-chart-5 rounded-full"></div>
						Application Overview
					</CardTitle>
					<p className="text-sm text-muted-foreground mt-2 ml-4">
						Track your progress over time
					</p>
				</CardHeader>
				<CardContent className="pt-8 pb-6 relative">
					<JobStatsChart />
				</CardContent>
			</Card>
		</div>
	);
}
