import { z } from 'zod';

export const createJobSchema = z.object({
	title: z.string().min(2, 'Title must be at least 2 characters long'),
	description: z.string().optional(),
	company_name: z.string().min(2, 'Company name must be at least 2 characters long'),
	company_id: z.string().optional(),
	location: z.string().optional(),
	job_type: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']).optional(),
	work_mode: z.enum(['remote', 'hybrid', 'onsite']).optional(),
	salary_min: z.number().min(0).optional(),
	salary_max: z.number().min(0).optional(),
	salary_currency: z.string().optional(),
	job_url: z.string().url('Invalid URL').optional().or(z.literal('')),
	company_url: z.string().url('Invalid URL').optional().or(z.literal('')),
	linkedin_url: z.string().url('Invalid URL').optional().or(z.literal('')),
	application_link: z.string().url('Invalid URL').optional().or(z.literal('')),
	application_process: z.string().optional(),
	status: z.enum(['saved', 'applied', 'interviewing', 'offered', 'rejected', 'accepted', 'withdrawn']).default('saved'),
	deadline: z.string().optional().or(z.date().optional()),
	special_requirements: z.string().optional(),
	skills: z.array(z.string()).optional(),
	notes: z.string().optional(),
});

export const updateJobSchema = z.object({
	title: z.string().min(2, 'Title must be at least 2 characters long').optional(),
	description: z.string().optional(),
	company_name: z.string().min(2, 'Company name must be at least 2 characters long').optional(),
	company_id: z.string().optional(),
	location: z.string().optional(),
	job_type: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']).optional(),
	work_mode: z.enum(['remote', 'hybrid', 'onsite']).optional(),
	salary_min: z.number().min(0).optional(),
	salary_max: z.number().min(0).optional(),
	salary_currency: z.string().optional(),
	job_url: z.string().url('Invalid URL').optional().or(z.literal('')),
	company_url: z.string().url('Invalid URL').optional().or(z.literal('')),
	linkedin_url: z.string().url('Invalid URL').optional().or(z.literal('')),
	application_link: z.string().url('Invalid URL').optional().or(z.literal('')),
	application_process: z.string().optional(),
	status: z.enum(['saved', 'applied', 'interviewing', 'offered', 'rejected', 'accepted', 'withdrawn']).optional(),
	deadline: z.string().optional().or(z.date().optional()),
	special_requirements: z.string().optional(),
	skills: z.array(z.string()).optional(),
	notes: z.string().optional(),
});

export type CreateJobData = z.infer<typeof createJobSchema>;
export type UpdateJobData = z.infer<typeof updateJobSchema>;
