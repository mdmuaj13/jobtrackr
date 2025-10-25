'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteJob, updateJob } from '@/hooks/jobs';
import { ViewField, formatDate } from '@/components/ui/view-field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, Minimize2, X } from 'lucide-react';
import { EventList } from '@/components/events/event-list';
import { Timeline } from '@/components/activities/timeline';
import { Separator } from '@/components/ui/separator';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Edit, Trash2 } from 'lucide-react';
import { JobChatInterface } from './job-chat-interface';

interface Job {
	_id: string;
	title: string;
	description?: string;
	company_name: string;
	location?: string;
	job_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
	work_mode?: 'remote' | 'hybrid' | 'onsite';
	salary_min?: number;
	salary_max?: number;
	salary_currency?: string;
	job_url?: string;
	linkedin_url?: string;
	status: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted' | 'withdrawn';
	applied_date?: string;
	deadline?: string;
	application_process?: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

interface JobDetailsPageViewProps {
	job: Job;
	onSuccess?: () => void;
}

const getStatusBadgeVariant = (status: Job['status']) => {
	switch (status) {
		case 'saved':
			return 'secondary';
		case 'applied':
			return 'default';
		case 'interviewing':
			return 'default';
		case 'offered':
			return 'default';
		case 'accepted':
			return 'default';
		case 'rejected':
			return 'destructive';
		case 'withdrawn':
			return 'outline';
		default:
			return 'secondary';
	}
};

const formatStatus = (status?: string) => {
	if (!status) return 'Unknown';
	return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatJobType = (jobType?: string) => {
	if (!jobType) return 'Not provided';
	return jobType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
};

const formatWorkMode = (workMode?: string) => {
	if (!workMode) return 'Not provided';
	return workMode.charAt(0).toUpperCase() + workMode.slice(1);
};

const formatSalary = (min?: number, max?: number, currency?: string) => {
	if (!min && !max) return 'Not provided';
	const curr = currency || 'USD';
	if (min && max) return `${curr} ${min.toLocaleString()} - ${max.toLocaleString()}`;
	if (min) return `${curr} ${min.toLocaleString()}+`;
	if (max) return `Up to ${curr} ${max.toLocaleString()}`;
	return 'Not provided';
};

export function JobDetailsPageView({
	job: initialJob,
	onSuccess,
}: JobDetailsPageViewProps) {
	const router = useRouter();
	const [job, setJob] = useState(initialJob);
	const [isMarkingApplied, setIsMarkingApplied] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleMarkAsApplied = async () => {
		setIsMarkingApplied(true);
		try {
			const submitData = { status: 'applied' as const };
			const response = await updateJob(job._id, submitData);
			setJob((prev) => ({ ...prev, ...response.data }));

			toast.success('Job marked as applied');
			onSuccess?.();
		} catch {
			toast.error('Failed to mark job as applied');
		} finally {
			setIsMarkingApplied(false);
		}
	};

	const handleClose = () => {
		router.back();
	};

	const handleEdit = () => {
		// Navigate to edit page or implement edit functionality
		router.push(`/jobs`);
	};

	const handleDeleteClick = () => {
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		setIsDeleting(true);
		try {
			await deleteJob(job._id);
			toast.success('Job deleted successfully');
			router.push('/jobs');
		} catch (error) {
			console.error('Error deleting job:', error);
			toast.error('Failed to delete job');
		} finally {
			setIsDeleting(false);
			setDeleteDialogOpen(false);
		}
	};

	return (
		<>
			{/* 5-Column Grid Layout */}
			<div className="grid grid-cols-5 gap-6 h-full">
				{/* Chat Interface - 3 columns */}
				<div className="col-span-3 h-full">
					<JobChatInterface jobId={job._id} jobTitle={job.title} />
				</div>

				{/* Job Details - 2 columns */}
				<div className="col-span-2 flex flex-col h-full bg-background border rounded-lg shadow-lg">
					{/* Custom Header */}
					<div className="flex flex-col gap-1.5 p-4 border-b">
						<div className="flex items-center justify-between">
							<h2 className="font-semibold">Job Details</h2>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={handleClose}
									title="Minimize"
								>
									<Minimize2 className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={handleClose}
									title="Close"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="flex-1 space-y-6 p-4 overflow-y-auto">
						<div className="grid grid-cols-1 gap-4">
						<ViewField
							label="Job Title"
							value={<p className="text-sm font-semibold">{job.title}</p>}
						/>

						<ViewField
							label="Company Name"
							value={<p className="text-sm">{job.company_name}</p>}
						/>

						<ViewField
							label="Description"
							value={
								<p className="text-sm whitespace-pre-wrap">
									{job.description || 'No description'}
								</p>
							}
						/>

						<ViewField
							label="Location"
							value={<p className="text-sm">{job.location || 'Not provided'}</p>}
						/>

						<div className="grid grid-cols-2 gap-4">
							<ViewField
								label="Status"
								value={
									<Badge variant={getStatusBadgeVariant(job.status)}>
										{formatStatus(job.status)}
									</Badge>
								}
							/>

							<ViewField
								label="Applied Date"
								value={
									<p className="text-sm">
										{job.applied_date ? new Date(job.applied_date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										}) : 'Not applied yet'}
									</p>
								}
							/>

							<ViewField
								label="Job Type"
								value={<p className="text-sm">{formatJobType(job.job_type)}</p>}
							/>

							<ViewField
								label="Work Mode"
								value={<p className="text-sm">{formatWorkMode(job.work_mode)}</p>}
							/>
						</div>

						<ViewField
							label="Salary Range"
							value={<p className="text-sm">{formatSalary(job.salary_min, job.salary_max, job.salary_currency)}</p>}
						/>

						<ViewField
							label="Application Deadline"
							value={
								<p className="text-sm">
									{job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									}) : 'Not provided'}
								</p>
							}
						/>

						<ViewField
							label="Job Posting URL"
							value={
								job.job_url ? (
									<a
										href={job.job_url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-blue-600 hover:underline break-all">
										{job.job_url}
									</a>
								) : (
									<p className="text-sm">Not provided</p>
								)
							}
						/>

						<ViewField
							label="LinkedIn URL"
							value={
								job.linkedin_url ? (
									<a
										href={job.linkedin_url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-blue-600 hover:underline break-all">
										{job.linkedin_url}
									</a>
								) : (
									<p className="text-sm">Not provided</p>
								)
							}
						/>

						<ViewField
							label="Application Process"
							value={
								<p className="text-sm whitespace-pre-wrap">
									{job.application_process || 'No application process details'}
								</p>
							}
						/>

						<ViewField
							label="Notes"
							value={
								<p className="text-sm whitespace-pre-wrap">
									{job.notes || 'No notes'}
								</p>
							}
						/>

						<div className="grid grid-cols-2 gap-4">
							<ViewField
								label="Created"
								value={<p className="text-sm">{formatDate(job.createdAt)}</p>}
							/>

							<ViewField
								label="Last Updated"
								value={<p className="text-sm">{formatDate(job.updatedAt)}</p>}
							/>
						</div>

						{/* Activity Timeline Section */}
						{/* <div className="mt-6 pt-6 border-t">
							<Timeline jobId={job._id} />
						</div> */}

						{/* <Separator className="my-6" /> */}

						{/* Events & Deadlines Section */}
						{/* <div className="mt-6">
							<EventList jobId={job._id} />
						</div> */}
						</div>
					</div>

					{/* Footer */}
					<div className="mt-auto flex flex-col gap-2 p-4 border-t">
						{job.status === 'saved' && (
							<div className="w-full">
								<Button
									onClick={handleMarkAsApplied}
									disabled={isMarkingApplied}
									className="w-full"
								>
									<Check className="h-4 w-4 mr-2" />
									{isMarkingApplied ? 'Marking...' : 'Mark as Applied'}
								</Button>
							</div>
						)}
						<div className="flex gap-2 w-full">
							<Button
								type="button"
								variant="outline"
								onClick={handleEdit}
								className="flex-1 items-center gap-2">
								<Edit className="h-4 w-4" />
								Edit
							</Button>
							<Button
								type="button"
								variant="destructive"
								onClick={handleDeleteClick}
								className="flex-1 items-center gap-2">
								<Trash2 className="h-4 w-4" />
								Delete
							</Button>
						</div>
					</div>
				</div>
			</div>

			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				title="Delete Job"
				description={`Are you sure you want to delete "${job.title}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
				isLoading={isDeleting}
			/>
		</>
	);
}
