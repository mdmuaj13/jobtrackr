'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plus } from 'lucide-react';
import { useJobs, deleteJob } from '@/hooks/jobs';
import { JobForm } from './create';
import { JobEditForm } from './edit-form';
import { JobView } from './view';
import { toast } from 'sonner';
import { SimpleTable } from '@/components/simple-table';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Spinner } from '../ui/shadcn-io/spinner';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';

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

	const {
		data: jobsData,
		error,
		mutate: mutateJobs,
	} = useJobs({
		page,
		limit: pageSize,
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

	const getStatusVariant = (status: string) => {
		switch (status) {
			case 'saved':
				return 'secondary';
			case 'applied':
				return 'default';
			case 'interviewing':
				return 'default';
			case 'offered':
				return 'default';
			case 'rejected':
				return 'destructive';
			case 'accepted':
				return 'default';
			case 'withdrawn':
				return 'outline';
			default:
				return 'secondary';
		}
	};

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
			key: 'status',
			header: 'Status',
			render: (value: unknown) => (
				<Badge variant={getStatusVariant(String(value)) as 'default' | 'secondary' | 'destructive' | 'outline'}>
					{String(value).charAt(0).toUpperCase() + String(value).slice(1)}
				</Badge>
			),
		},
		// {
		// 	key: 'location',
		// 	header: 'Location',
		// 	render: (value: unknown) => (
		// 		<span className="max-w-xs truncate block">
		// 			{value ? String(value) : '-'}
		// 		</span>
		// 	),
		// },
		{
			key: 'salary_min',
			header: 'Salary Range',
			render: (value: unknown, row: Job) => {
				const salaryMin = row.salary_min;
				const salaryMax = row.salary_max;

				if (!salaryMin && !salaryMax) return <span>-</span>;
				if (salaryMin && salaryMax) {
					return (
						<span className="max-w-xs truncate block">
							{salaryMin} - {salaryMax} {row.salary_currency || 'USD'}
						</span>
					);
				}
				return (
					<span className="max-w-xs truncate block">
						{salaryMin || salaryMax} {row.salary_currency || 'USD'}
					</span>
				);
			},
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
			key: 'applied_date',
			header: 'Applied Date',
			render: (value: unknown) =>
				value ? new Date(String(value)).toLocaleDateString() : '-',
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

			{/* Jobs Table */}
			<Card>
				<CardContent>
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
				</CardContent>
			</Card>

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
