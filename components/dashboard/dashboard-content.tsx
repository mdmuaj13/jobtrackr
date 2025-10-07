'use client';

import { useDashboardStats } from '@/hooks/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { IconBriefcase, IconCalendar, IconChecks, IconClock } from '@tabler/icons-react';
import { SimpleTable } from '@/components/simple-table';
import { useRouter } from 'next/navigation';

interface Job {
	_id: string;
	title: string;
	company_name: string;
	location?: string;
	job_type?: string;
	deadline?: string;
	createdAt: string;
	status?: string;
	work_mode?: string;
}

export function DashboardContent() {
	const { data, isLoading, error } = useDashboardStats();
	const router = useRouter();

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'saved':
				return 'bg-secondary text-secondary-foreground border-secondary';
			case 'applied':
				return 'bg-[hsl(var(--chart-1))]/10 text-[hsl(var(--chart-1))] border-[hsl(var(--chart-1))]/20';
			case 'interviewing':
				return 'bg-[hsl(var(--chart-4))]/10 text-[hsl(var(--chart-4))] border-[hsl(var(--chart-4))]/20';
			case 'offered':
				return 'bg-[hsl(var(--chart-2))]/10 text-[hsl(var(--chart-2))] border-[hsl(var(--chart-2))]/20';
			case 'rejected':
				return 'bg-destructive/10 text-destructive border-destructive/20';
			case 'accepted':
				return 'bg-[hsl(var(--chart-2))]/20 text-[hsl(var(--chart-2))] border-[hsl(var(--chart-2))]/30 font-semibold';
			case 'withdrawn':
				return 'bg-muted text-muted-foreground border-border';
			default:
				return 'bg-secondary text-secondary-foreground border-secondary';
		}
	};

	const columns = [
		{
			key: 'title',
			header: 'Job Title',
			render: (value: unknown, row: Job) => (
				<div>
					<div className="font-medium">{String(value)}</div>
					<div className="text-xs text-muted-foreground">{row.company_name}</div>
				</div>
			),
		},
		{
			key: 'status',
			header: 'Status',
			render: (value: unknown) => (
				<Badge variant="outline" className={getStatusColor(String(value))}>
					{String(value).charAt(0).toUpperCase() + String(value).slice(1)}
				</Badge>
			),
		},
		{
			key: 'location',
			header: 'Location',
			render: (value: unknown) => (
				<span className="max-w-xs truncate block">
					{value ? String(value) : '-'}
				</span>
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
			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className="border-l-4 border-l-[hsl(var(--chart-1))]">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Applied Jobs</CardTitle>
						<div className="rounded-full bg-[hsl(var(--chart-1))]/10 p-2">
							<IconChecks className="h-4 w-4 text-[hsl(var(--chart-1))]" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-[hsl(var(--chart-1))]">{stats?.applied || 0}</div>
						<p className="text-xs text-muted-foreground mt-1">
							Jobs you&apos;ve applied to
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-[hsl(var(--chart-3))]">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Yet to Apply</CardTitle>
						<div className="rounded-full bg-[hsl(var(--chart-3))]/10 p-2">
							<IconBriefcase className="h-4 w-4 text-[hsl(var(--chart-3))]" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-[hsl(var(--chart-3))]">{stats?.notApplied || 0}</div>
						<p className="text-xs text-muted-foreground mt-1">
							Saved jobs not applied
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-destructive">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Deadline Today</CardTitle>
						<div className="rounded-full bg-destructive/10 p-2">
							<IconClock className="h-4 w-4 text-destructive" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-destructive">{stats?.deadlineToday || 0}</div>
						<p className="text-xs text-muted-foreground mt-1">
							Applications due today
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-[hsl(var(--chart-4))]">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Deadline This Week</CardTitle>
						<div className="rounded-full bg-[hsl(var(--chart-4))]/10 p-2">
							<IconCalendar className="h-4 w-4 text-[hsl(var(--chart-4))]" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-[hsl(var(--chart-4))]">{stats?.deadlineWeek || 0}</div>
						<p className="text-xs text-muted-foreground mt-1">
							Due within 7 days
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Not Applied Jobs Table */}
			<Card className="border-t-2 border-t-[hsl(var(--chart-3))]">
				<CardHeader className="bg-gradient-to-r from-[hsl(var(--chart-3))]/5 to-transparent">
					<CardTitle className="flex items-center gap-2">
						<span className="h-5 w-1 bg-[hsl(var(--chart-3))] rounded-full"></span>
						Recent Jobs Not Applied
					</CardTitle>
				</CardHeader>
				<CardContent>
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

			{/* Rejected Jobs Table */}
			<Card className="border-t-2 border-t-destructive">
				<CardHeader className="bg-gradient-to-r from-destructive/5 to-transparent">
					<CardTitle className="flex items-center gap-2">
						<span className="h-5 w-1 bg-destructive rounded-full"></span>
						Rejected Jobs
					</CardTitle>
				</CardHeader>
				<CardContent>
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
