'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { createEvent, updateEvent } from '@/hooks/events';
import { toast } from 'sonner';

interface EventFormProps {
	isOpen: boolean;
	onClose: () => void;
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

export function EventForm({ isOpen, onClose, jobId, event, onSuccess }: EventFormProps) {
	const [loading, setLoading] = useState(false);
	const [datePickerOpen, setDatePickerOpen] = useState(false);
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
	}, [event, isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const payload = {
				job_id: jobId,
				title: formData.title || undefined,
				content: formData.content,
				schedule_date: formData.schedule_date ? formData.schedule_date.toISOString() : undefined,
				is_checked: formData.is_checked,
			};

			if (event?._id) {
				await updateEvent(event._id, payload);
				toast.success('Event updated successfully');
			} else {
				await createEvent(payload);
				toast.success('Event created successfully');
			}

			onClose();
			onSuccess?.();
		} catch (error) {
			console.error('Failed to save event:', error);
			toast.error(`Failed to ${event?._id ? 'update' : 'create'} event`);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<Card className="">
			<CardHeader className="px-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">
						{event?._id ? 'Edit Event' : 'Add New Event'}
					</CardTitle>
					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="h-8 w-8"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="px-4 pt-0">
				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="space-y-2.5">
						<div className="space-y-1.5">
							<Label htmlFor="title" className="text-sm">Title (optional)</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								placeholder="e.g., Follow up with recruiter"
								className="h-9"
							/>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="content" className="text-sm">Content *</Label>
							<Textarea
								id="content"
								value={formData.content}
								onChange={(e) => setFormData({ ...formData, content: e.target.value })}
								required
								rows={3}
								placeholder="Describe the event or task..."
								className="resize-none"
							/>
						</div>

						<div className="flex items-center gap-3">
							<Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										size="sm"
										className="h-9 text-xs"
									>
										<CalendarIcon className="mr-2 h-3.5 w-3.5" />
										{formData.schedule_date ? format(formData.schedule_date, 'MMM d, yyyy') : 'Add date'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={formData.schedule_date}
										onSelect={(date) => {
											setFormData({ ...formData, schedule_date: date });
											setDatePickerOpen(false);
										}}
									/>
								</PopoverContent>
							</Popover>

							{formData.schedule_date && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => setFormData({ ...formData, schedule_date: undefined })}
									className="h-9 text-xs"
								>
									Clear date
								</Button>
							)}
						</div>

						<div className="flex items-center justify-between pt-1">
							<Label htmlFor="is_checked" className="text-sm">Mark as completed</Label>
							<Switch
								id="is_checked"
								checked={formData.is_checked}
								onCheckedChange={(checked) => setFormData({ ...formData, is_checked: checked })}
							/>
						</div>
					</div>

					<div className="flex justify-end gap-2 pt-1">
						<Button type="button" variant="outline" onClick={onClose} size="sm">
							Cancel
						</Button>
						<Button type="submit" disabled={loading} size="sm">
							{loading ? 'Saving...' : event?._id ? 'Update' : 'Create'}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
