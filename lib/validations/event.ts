import { z } from 'zod';

export const createEventSchema = z.object({
	job_id: z.string().min(1, 'Job ID is required'),
	title: z.string().optional(),
	content: z.string().min(1, 'Content is required'),
	schedule_date: z.string().optional().or(z.date().optional()),
	is_checked: z.boolean().default(false),
});

export const updateEventSchema = z.object({
	title: z.string().optional(),
	content: z.string().min(1, 'Content is required').optional(),
	schedule_date: z.string().optional().or(z.date().optional()),
	is_checked: z.boolean().optional(),
});

export type CreateEventData = z.infer<typeof createEventSchema>;
export type UpdateEventData = z.infer<typeof updateEventSchema>;
