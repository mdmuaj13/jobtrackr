'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Search } from 'lucide-react';
import { useJobs, deleteJob } from '@/hooks/jobs';
import { JobForm } from './create';
import { JobEditForm } from './edit-form';
import { JobView } from './view';
import { toast } from 'sonner';
import { SimpleTable } from '@/components/simple-table';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Spinner } from '../ui/shadcn-io/spinner';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Job {
	_id: string;
	title: string;
	description?: string;
	company_name: string;
	location?: string;
	job_type?:
		| 'full-time'
		| 'part-time'
		| 'contract'
		| 'internship'
		| 'freelance';
	work_mode?: 'remote' | 'hybrid' | 'onsite';
	salary_min?: number;
	salary_max?: number;
	salary_currency?: string;
	job_url?: string;
	company_url?: string;
	linkedin_url?: string;
	status:
		| 'saved'
		| 'applied'
		| 'interviewing'
		| 'offered'
		| 'rejected'
		| 'accepted'
		| 'withdrawn';
	applied_date?: string;
	deadline?: string;
	special_requirements?: string;
	skills?: string[];
	experience_level?: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export function JobsList() {
	const searchParams = useSearchParams();
	const [createSheetOpen, setCreateSheetOpen] = useState(false);
	const [editSheetOpen, setEditSheetOpen] = useState(false);
	const [viewSheetOpen, setViewSheetOpen] = useState(false);
	const [editingJob, setEditingJob] = useState<Job | null>(null);
	const [viewingJob, setViewingJob] = useState<Job | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingJob, setDeletingJob] = useState<Job | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('');

	// Set initial filter from URL parameters
	useEffect(() => {
		const statusParam = searchParams.get('status');
		if (statusParam) {
			setStatusFilter(statusParam);
		}
	}, [searchParams]);

	const {
		data: jobsData,
		error,
		mutate: mutateJobs,
	} = useJobs({
		page,
		limit: pageSize,
		search: searchQuery || undefined,
		status: statusFilter || undefined,
	});

	const jobs = jobsData?.data || [];
	const meta = jobsData?.meta;

	const handleDeleteClick = (job: Job) => {
		setDeletingJob(job);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!deletingJob) return;

		setIsDeleting(true);
		try {
			await deleteJob(deletingJob._id);
			toast.success('Job deleted successfully');
			mutateJobs();
		} catch {
			toast.error('Failed to delete job');
		} finally {
			setIsDeleting(false);
			setDeleteDialogOpen(false);
			setDeletingJob(null);
		}
	};

	const handleViewJob = (job: Job) => {
		setViewingJob(job);
		setViewSheetOpen(true);
	};

	const handleEditJob = (job: Job) => {
		setEditingJob(job);
		setEditSheetOpen(true);
	};

	const handleViewToEdit = () => {
		if (viewingJob) {
			setViewSheetOpen(false);
			setEditingJob(viewingJob);
			setEditSheetOpen(true);
		}
	};

	const handleViewToDelete = () => {
		setViewSheetOpen(false);
		mutateJobs();
	};

	const handleCreateSuccess = () => {
		setCreateSheetOpen(false);
		mutateJobs();
	};

	const handleEditSuccess = () => {
		setEditSheetOpen(false);
		setEditingJob(null);
		mutateJobs();
	};

	const handleViewSuccess = () => {
		setViewSheetOpen(false);
		setViewingJob(null);
		mutateJobs();
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'saved':
				return 'bg-chart-4 text-primary border-2 border-chart-4 font-semibold';
			case 'applied':
				return 'bg-chart-1 text-primary border-2 border-chart-1 font-semibold';
			case 'interviewing':
				return 'bg-chart-2 text-primary border-2 border-chart-2 font-semibold';
			case 'offered':
				return 'bg-chart-5 text-primary border-2 border-chart-5 font-semibold';
			case 'rejected':
				return 'bg-destructive/20 text-destructive border-2 border-destructive/40 font-semibold';
			case 'accepted':
				return 'bg-chart-1 text-primary border-2 border-chart-1 font-semibold shadow-md';
			case 'withdrawn':
				return 'bg-chart-3 text-primary border-2 border-chart-3 font-semibold';
			default:
				return 'bg-muted text-muted-foreground border-2 border-border';
		}
	};

	const columns = [
		{
			key: 'title',
			header: 'Job Title',
			render: (value: unknown, row: Job) => (
				<div className="min-w-[200px] max-w-[300px]">
					<div className="font-medium truncate">
						{String(value).length > 50
							? String(value).slice(0, 50) + '...'
							: String(value)}
					</div>
					<div className="text-xs text-muted-foreground truncate">
						{row.company_name}
					</div>
				</div>
			),
		},
		{
			key: 'status',
			header: 'Status',
			render: (value: unknown) => (
				<span
					className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize whitespace-nowrap ${getStatusColor(
						String(value)
					)}`}>
					{String(value)}
				</span>
			),
		},
		{
			key: 'salary_min',
			header: 'Salary Range',
			render: (value: unknown, row: Job) => {
				const salaryMin = row.salary_min;
				const salaryMax = row.salary_max;

				const formatSalary = (amount: number) => {
					return amount >= 10000 ? `${amount / 1000}K` : amount.toString();
				};

				if (!salaryMin && !salaryMax) return <span>-</span>;
				if (salaryMin && salaryMax) {
					return (
						<span className="whitespace-nowrap">
							{formatSalary(salaryMin)} - {formatSalary(salaryMax)}{' '}
							{row.salary_currency || 'USD'}
						</span>
					);
				}
				return (
					<span className="whitespace-nowrap">
						{formatSalary((salaryMin || salaryMax)!)}{' '}
						{row.salary_currency || 'USD'}
					</span>
				);
			},
		},
		{
			key: 'job_type',
			header: 'Type & Location',
			render: (value: unknown, row: Job) => (
				<div className="min-w-[150px]">
					<div className="font-medium capitalize truncate">
						{value ? String(value).replace('-', ' ') : '-'}
						{row.work_mode && (
							<span className="text-muted-foreground">
								{' '}• {String(row.work_mode)}
							</span>
						)}
					</div>
					<div className="text-xs text-muted-foreground capitalize truncate">
						{row.location
							? row.location.length > 20
								? row.location.slice(0, 20) + '...'
								: row.location
							: ''}
					</div>
				</div>
			),
		},
		// {
		// 	key: 'applied_date',
		// 	header: 'Applied Date',
		// 	render: (value: unknown) => (
		// 		<span className="whitespace-nowrap">
		// 			{value ? new Date(String(value)).toLocaleDateString() : '-'}
		// 		</span>
		// 	),
		// },
		// {
		// 	key: 'deadline',
		// 	header: 'Deadline',
		// 	render: (value: unknown) => (
		// 		<span className="whitespace-nowrap">
		// 			{value ? new Date(String(value)).toLocaleDateString() : '-'}
		// 		</span>
		// 	),
		// },
	];

	const actions = [
		{
			label: 'View',
			onClick: (job: Job) => {
				handleViewJob(job);
			},
			variant: 'secondary' as const,
		},
		{
			label: 'Edit',
			onClick: (job: Job) => handleEditJob(job),
			variant: 'outline' as const,
		},
		{
			label: 'Delete',
			onClick: (job: Job) => handleDeleteClick(job),
			variant: 'destructive' as const,
		},
	];

	if (error) {
		return (
			<Card>
				<CardContent className="p-6">
					<p className="text-center text-red-500">Failed to load jobs</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Jobs ({meta?.total || 0})</h1>
				<div className="flex items-center gap-2">
					<Sheet open={createSheetOpen} onOpenChange={setCreateSheetOpen}>
						<SheetTrigger asChild>
							<Button>
								<Plus className="h-4 w-4 mr-2" />
								Add Job
							</Button>
						</SheetTrigger>
						<SheetContent className="w-full sm:min-w-5xl">
							<div className="h-full">
								<JobForm onSuccess={handleCreateSuccess} />
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			{/* Search and Filter */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search by job title, company, or location..."
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setPage(1); // Reset to first page on search
						}}
						className="pl-9"
					/>
				</div>
				<Select
					value={statusFilter || 'all'}
					onValueChange={(value) => {
						setStatusFilter(value === 'all' ? '' : value);
						setPage(1); // Reset to first page on filter change
					}}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All Statuses" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Statuses</SelectItem>
						<SelectItem value="saved">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-chart-4 border-2 border-primary/20" />
								Saved
							</div>
						</SelectItem>
						<SelectItem value="applied">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-chart-1 border-2 border-primary/20" />
								Applied
							</div>
						</SelectItem>
						<SelectItem value="interviewing">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-chart-2 border-2 border-primary/20" />
								Interviewing
							</div>
						</SelectItem>
						<SelectItem value="offered">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-chart-5 border-2 border-primary/20" />
								Offered
							</div>
						</SelectItem>
						<SelectItem value="rejected">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-destructive border-2 border-destructive/40" />
								Rejected
							</div>
						</SelectItem>
						<SelectItem value="accepted">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-chart-1 border-2 border-primary/20 shadow-sm" />
								Accepted
							</div>
						</SelectItem>
						<SelectItem value="withdrawn">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-chart-3 border-2 border-primary/20" />
								Withdrawn
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Jobs Table */}
			<div className="w-full">
				<div className="overflow-x-auto">
					{!jobsData && !error ? (
						<div className="flex items-center justify-center py-8">
							<Spinner variant="pinwheel" />
						</div>
					) : jobs.length === 0 ? (
						<div className="flex items-center justify-center py-8">
							<p>No jobs found</p>
						</div>
					) : (
						<>
							<SimpleTable
								data={jobs}
								columns={columns}
								actions={actions}
								showPagination={false}
								onRowClick={handleViewJob}
							/>
							<Pagination
								currentPage={page}
								pageSize={pageSize}
								totalItems={meta?.total || 0}
								totalPages={meta?.totalPages || 1}
								onPageChange={setPage}
								onPageSizeChange={setPageSize}
								itemName="jobs"
							/>
						</>
					)}
				</div>
			</div>

			{/* View Sheet */}
			<Sheet open={viewSheetOpen} onOpenChange={setViewSheetOpen}>
				<SheetContent className="w-full sm:min-w-5xl" hideClose={true}>
					<div className="h-full">
						{viewingJob && (
							<JobView
								job={viewingJob}
								onEdit={handleViewToEdit}
								onDelete={handleViewToDelete}
								onSuccess={handleViewSuccess}
							/>
						)}
					</div>
				</SheetContent>
			</Sheet>

			{/* Edit Sheet */}
			<Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
				<SheetContent className="w-full sm:min-w-5xl">
					<div className="h-full">
						{editingJob && (
							<JobEditForm job={editingJob} onSuccess={handleEditSuccess} />
						)}
					</div>
				</SheetContent>
			</Sheet>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				title="Delete Job"
				description={`Are you sure you want to delete "${deletingJob?.title}" at ${deletingJob?.company_name}? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
				isLoading={isDeleting}
			/>
		</div>
	);
}
