'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetClose,
} from '@/components/ui/sheet';
import { updateJob } from '@/hooks/jobs';
import { toast } from 'sonner';

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
	linkedin_url?: string;
	status:
		| 'saved'
		| 'applied'
		| 'interviewing'
		| 'offered'
		| 'rejected'
		| 'accepted'
		| 'withdrawn';
	deadline?: string;
	application_process?: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

interface JobEditFormProps {
	job: Job;
	onSuccess?: () => void;
}

interface FormData {
	title: string;
	description: string;
	company_name: string;
	location: string;
	job_type: string;
	work_mode: string;
	salary_min: string;
	salary_max: string;
	salary_currency: string;
	job_url: string;
	linkedin_url: string;
	status: string;
	deadline: string;
	application_process: string;
	notes: string;
}

export function JobEditForm({ job, onSuccess }: JobEditFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		title: job.title,
		description: job.description || '',
		company_name: job.company_name,
		location: job.location || '',
		job_type: job.job_type || '',
		work_mode: job.work_mode || '',
		salary_min: job.salary_min?.toString() || '',
		salary_max: job.salary_max?.toString() || '',
		salary_currency: job.salary_currency || 'USD',
		job_url: job.job_url || '',
		linkedin_url: job.linkedin_url || '',
		status: job.status,
		deadline: job.deadline ? job.deadline.split('T')[0] : '',
		application_process: job.application_process || '',
		notes: job.notes || '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const submitData = {
				title: formData.title,
				description: formData.description || undefined,
				company_name: formData.company_name,
				location: formData.location || undefined,
				job_type: (formData.job_type || undefined) as
					| 'full-time'
					| 'part-time'
					| 'contract'
					| 'internship'
					| 'freelance'
					| undefined,
				work_mode: (formData.work_mode || undefined) as
					| 'remote'
					| 'hybrid'
					| 'onsite'
					| undefined,
				salary_min: formData.salary_min
					? parseFloat(formData.salary_min)
					: undefined,
				salary_max: formData.salary_max
					? parseFloat(formData.salary_max)
					: undefined,
				salary_currency: formData.salary_currency || undefined,
				job_url: formData.job_url || undefined,
				linkedin_url: formData.linkedin_url || undefined,
				status: formData.status as
					| 'saved'
					| 'applied'
					| 'interviewing'
					| 'offered'
					| 'rejected'
					| 'accepted'
					| 'withdrawn',
				deadline: formData.deadline || undefined,
				application_process: formData.application_process || undefined,
				notes: formData.notes || undefined,
			};

			await updateJob(job._id, submitData);
			toast.success('Job updated successfully');
			onSuccess?.();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Failed to update job'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-full space-y-6 p-4 pt-4 overflow-y-auto">
			<SheetHeader className="px-0">
				<SheetTitle>Edit Job</SheetTitle>
				<SheetDescription>Update the job information below.</SheetDescription>
			</SheetHeader>

			<form
				onSubmit={handleSubmit}
				className="flex-1 space-y-4 overflow-y-auto">
				<div className="space-y-2">
					<Label htmlFor="title">Job Title *</Label>
					<Input
						id="title"
						name="title"
						placeholder="e.g. Senior Software Engineer"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="company_name">Company Name *</Label>
						<Input
							id="company_name"
							name="company_name"
							placeholder="Enter company name"
							value={formData.company_name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="status">Status</Label>
						<Select
							value={formData.status}
							onValueChange={(value) => handleSelectChange('status', value)}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent className="w-full">
								<SelectItem value="saved">Saved</SelectItem>
								<SelectItem value="applied">Applied</SelectItem>
								<SelectItem value="interviewing">Interviewing</SelectItem>
								<SelectItem value="offered">Offered</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
								<SelectItem value="accepted">Accepted</SelectItem>
								<SelectItem value="withdrawn">Withdrawn</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Enter job description"
						value={formData.description}
						onChange={handleChange}
						rows={3}
						className="resize-none"
					/>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div className="space-y-2">
						<Label htmlFor="location">Location</Label>
						<Input
							id="location"
							name="location"
							placeholder="e.g. New York, NY or Remote"
							value={formData.location}
							onChange={handleChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="job_type">Job Type</Label>
						<Select
							value={formData.job_type}
							onValueChange={(value) => handleSelectChange('job_type', value)}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent className="w-full">
								<SelectItem value="full-time">Full-time</SelectItem>
								<SelectItem value="part-time">Part-time</SelectItem>
								<SelectItem value="contract">Contract</SelectItem>
								<SelectItem value="internship">Internship</SelectItem>
								<SelectItem value="freelance">Freelance</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="work_mode">Work Mode</Label>
						<Select
							value={formData.work_mode}
							onValueChange={(value) => handleSelectChange('work_mode', value)}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select mode" />
							</SelectTrigger>
							<SelectContent className="w-full">
								<SelectItem value="remote">Remote</SelectItem>
								<SelectItem value="hybrid">Hybrid</SelectItem>
								<SelectItem value="onsite">Onsite</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div className="space-y-2">
						<Label htmlFor="salary_min">Min Salary</Label>
						<Input
							id="salary_min"
							name="salary_min"
							type="number"
							placeholder="50000"
							value={formData.salary_min}
							onChange={handleChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="salary_max">Max Salary</Label>
						<Input
							id="salary_max"
							name="salary_max"
							type="number"
							placeholder="100000"
							value={formData.salary_max}
							onChange={handleChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="salary_currency">Currency</Label>
						<Input
							id="salary_currency"
							name="salary_currency"
							placeholder="USD"
							value={formData.salary_currency}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="deadline">Application Deadline</Label>
					<Input
						id="deadline"
						name="deadline"
						type="date"
						value={formData.deadline}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="job_url">Job Posting URL</Label>
					<Input
						id="job_url"
						name="job_url"
						type="url"
						placeholder="https://company.com/jobs/123"
						value={formData.job_url}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="linkedin_url">LinkedIn URL</Label>
					<Input
						id="linkedin_url"
						name="linkedin_url"
						type="url"
						placeholder="https://linkedin.com/jobs/123"
						value={formData.linkedin_url}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="application_process">Application Process</Label>
					<Textarea
						id="application_process"
						name="application_process"
						placeholder="Describe the application process"
						value={formData.application_process}
						onChange={handleChange}
						rows={3}
						className="resize-none"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						name="notes"
						placeholder="Enter any personal notes"
						value={formData.notes}
						onChange={handleChange}
						rows={3}
						className="resize-none"
					/>
				</div>
			</form>

			<SheetFooter className="gap-2 px-0 mt-auto">
				<Button type="submit" disabled={isLoading} onClick={handleSubmit}>
					{isLoading ? 'Updating...' : 'Update Job'}
				</Button>
				<SheetClose asChild>
					<Button type="button" variant="outline" disabled={isLoading}>
						Cancel
					</Button>
				</SheetClose>
			</SheetFooter>
		</div>
	);
}
