'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface EventFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	jobId: string;
	event?: {
		_id?: string;
		title?: string;
		content: string;
		schedule_date?: string;
		is_checked: boolean;
	};
	onSuccess?: () => void;
}

export function EventForm({ open, onOpenChange, jobId, event, onSuccess }: EventFormProps) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: event?.title || '',
		content: event?.content || '',
		schedule_date: event?.schedule_date ? new Date(event.schedule_date) : undefined,
		is_checked: event?.is_checked || false,
	});

	useEffect(() => {
		if (event) {
			setFormData({
				title: event.title || '',
				content: event.content || '',
				schedule_date: event.schedule_date ? new Date(event.schedule_date) : undefined,
				is_checked: event.is_checked || false,
			});
		} else {
			setFormData({
				title: '',
				content: '',
				schedule_date: undefined,
				is_checked: false,
			});
		}
	}, [event, open]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = event?._id ? `/api/events/${event._id}` : '/api/events';
			const method = event?._id ? 'PUT' : 'POST';

			const payload: Record<string, unknown> = {
				job_id: jobId,
				title: formData.title || undefined,
				content: formData.content,
				schedule_date: formData.schedule_date ? formData.schedule_date.toISOString() : undefined,
				is_checked: formData.is_checked,
			};

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				onOpenChange(false);
				onSuccess?.();
			}
		} catch (error) {
			console.error('Failed to save event:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>{event?._id ? 'Edit Event' : 'Add New Event'}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Title (optional)</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								placeholder="e.g., Follow up with recruiter"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="content">Content *</Label>
							<Textarea
								id="content"
								value={formData.content}
								onChange={(e) => setFormData({ ...formData, content: e.target.value })}
								required
								rows={4}
								placeholder="Describe the event or task..."
							/>
						</div>

						<div className="grid gap-2">
							<Label>Schedule Date (optional)</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" className="justify-start text-left font-normal">
										<CalendarIcon className="mr-2 h-4 w-4" />
										{formData.schedule_date ? format(formData.schedule_date, 'PPP') : 'Pick a date'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={formData.schedule_date}
										onSelect={(date) => setFormData({ ...formData, schedule_date: date })}
									/>
								</PopoverContent>
							</Popover>
							{formData.schedule_date && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => setFormData({ ...formData, schedule_date: undefined })}
									className="text-xs"
								>
									Clear date
								</Button>
							)}
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="is_checked">Mark as completed</Label>
							<Switch
								id="is_checked"
								checked={formData.is_checked}
								onCheckedChange={(checked) => setFormData({ ...formData, is_checked: checked })}
							/>
						</div>
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							{loading ? 'Saving...' : event?._id ? 'Update Event' : 'Create Event'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
