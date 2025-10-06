import { z } from 'zod';

export const createCompanySchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters long'),
	industry: z.string().optional(),
	location: z.string().optional(),
	website: z.string().url('Invalid URL').optional().or(z.literal('')),
	description: z.string().optional(),
	contact_email: z.string().email('Invalid email address').optional().or(z.literal('')),
	contact_phone: z.string().optional(),
	logo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const updateCompanySchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
	industry: z.string().optional(),
	location: z.string().optional(),
	website: z.string().url('Invalid URL').optional().or(z.literal('')),
	description: z.string().optional(),
	contact_email: z.string().email('Invalid email address').optional().or(z.literal('')),
	contact_phone: z.string().optional(),
	logo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type CreateCompanyData = z.infer<typeof createCompanySchema>;
export type UpdateCompanyData = z.infer<typeof updateCompanySchema>;
