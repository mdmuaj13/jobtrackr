'use client';

import { useState } from 'react';
import { deleteJob } from '@/hooks/jobs';
import { EntityView } from '@/components/ui/entity-view';
import { ViewField, formatDate } from '@/components/ui/view-field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { updateJob } from '@/hooks/jobs';


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
	company_url?: string;
	linkedin_url?: string;
	status: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted' | 'withdrawn';
	applied_date?: string;
	deadline?: string;
	special_requirements?: string;
	skills?: string[];
	application_link?: string;
	application_process?: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

interface JobViewProps {
	job: Job;
	onEdit?: () => void;
	onDelete?: () => void;
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

const formatStatus = (status: string) => {
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

export function JobView({
	job: initialJob,
	onEdit,
	onDelete,
	onSuccess,
}: JobViewProps) {
	const [job, setJob] = useState(initialJob);
	const [isMarkingApplied, setIsMarkingApplied] = useState(false);

	const handleMarkAsApplied = async () => {
		setIsMarkingApplied(true);
		try {
			const submitData = { status: 'applied' as const };
			const updatedJob = await updateJob(job._id, submitData);
			setJob((prev) => ({ ...prev, ...updatedJob }));

			toast.success('Job marked as applied');
			onSuccess?.();
		} catch {
			toast.error('Failed to mark job as applied');
		} finally {
			setIsMarkingApplied(false);
		}
	};

	return (
		<EntityView
			title="Job Details"
			entity={job}
			entityName="Job"
			getEntityDisplayName={(j) => j.title}
			onEdit={onEdit}
			onDelete={onDelete}
			onSuccess={onSuccess}
			deleteFunction={deleteJob}
			customActions={
				job.status === 'saved' ? (
					<Button
						onClick={handleMarkAsApplied}
						disabled={isMarkingApplied}
						className="w-full"
					>
						<Check className="h-4 w-4 mr-2" />
						{isMarkingApplied ? 'Marking...' : 'Mark as Applied'}
					</Button>
				) : undefined
			}>
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
				label="Special Requirements"
				value={
					<p className="text-sm whitespace-pre-wrap">
						{job.special_requirements || 'No special requirements'}
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
				label="Company Website"
				value={
					job.company_url ? (
						<a
							href={job.company_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 hover:underline break-all">
							{job.company_url}
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
				label="Application Link"
				value={
					job.application_link ? (
						<a
							href={job.application_link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 hover:underline break-all">
							{job.application_link}
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
				label="Skills"
				value={
					job.skills && job.skills.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{job.skills.map((skill, index) => (
								<Badge key={index} variant="outline">
									{skill}
								</Badge>
							))}
						</div>
					) : (
						<p className="text-sm">No skills listed</p>
					)
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
		</EntityView>
	);
}
