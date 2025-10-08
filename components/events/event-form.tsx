'use client';

import { useState } from 'react';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
		title: string;
		event_type: string;
		description?: string;
		date: string;
		time?: string;
		duration?: number;
		location?: string;
		meeting_link?: string;
		contact_person?: string;
		contact_email?: string;
		contact_phone?: string;
		notes?: string;
		reminder?: boolean;
		reminder_time?: number;
		status?: string;
	};
	onSuccess?: () => void;
}

export function EventForm({ open, onOpenChange, jobId, event, onSuccess }: EventFormProps) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: event?.title || '',
		event_type: event?.event_type || 'interview',
		description: event?.description || '',
		date: event?.date ? new Date(event.date) : new Date(),
		time: event?.time || '',
		duration: event?.duration || 60,
		location: event?.location || '',
		meeting_link: event?.meeting_link || '',
		contact_person: event?.contact_person || '',
		contact_email: event?.contact_email || '',
		contact_phone: event?.contact_phone || '',
		notes: event?.notes || '',
		reminder: event?.reminder || false,
		reminder_time: event?.reminder_time || 30,
		status: event?.status || 'scheduled',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = event?._id ? `/api/events/${event._id}` : '/api/events';
			const method = event?._id ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					job_id: jobId,
					...formData,
					date: formData.date.toISOString(),
				}),
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
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{event?._id ? 'Edit Event' : 'Add New Event'}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Event Title *</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								required
								placeholder="e.g., Technical Interview"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="event_type">Event Type *</Label>
							<Select
								value={formData.event_type}
								onValueChange={(value) => setFormData({ ...formData, event_type: value })}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="interview">Interview</SelectItem>
									<SelectItem value="submission">Project Submission</SelectItem>
									<SelectItem value="follow_up">Follow Up</SelectItem>
									<SelectItem value="assessment">Assessment/Test</SelectItem>
									<SelectItem value="offer_deadline">Offer Deadline</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label>Date *</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="outline" className="justify-start text-left font-normal">
											<CalendarIcon className="mr-2 h-4 w-4" />
											{format(formData.date, 'PPP')}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={formData.date}
											onSelect={(date) => date && setFormData({ ...formData, date })}
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="time">Time</Label>
								<Input
									id="time"
									type="time"
									value={formData.time}
									onChange={(e) => setFormData({ ...formData, time: e.target.value })}
								/>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="duration">Duration (minutes)</Label>
							<Input
								id="duration"
								type="number"
								value={formData.duration}
								onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								rows={3}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="location">Location</Label>
							<Input
								id="location"
								value={formData.location}
								onChange={(e) => setFormData({ ...formData, location: e.target.value })}
								placeholder="e.g., Office address or virtual"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="meeting_link">Meeting Link</Label>
							<Input
								id="meeting_link"
								type="url"
								value={formData.meeting_link}
								onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
								placeholder="https://zoom.us/..."
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="contact_person">Contact Person</Label>
							<Input
								id="contact_person"
								value={formData.contact_person}
								onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="contact_email">Contact Email</Label>
								<Input
									id="contact_email"
									type="email"
									value={formData.contact_email}
									onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="contact_phone">Contact Phone</Label>
								<Input
									id="contact_phone"
									type="tel"
									value={formData.contact_phone}
									onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
								/>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="notes">Notes</Label>
							<Textarea
								id="notes"
								value={formData.notes}
								onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
								rows={3}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="reminder">Set Reminder</Label>
							<Switch
								id="reminder"
								checked={formData.reminder}
								onCheckedChange={(checked) => setFormData({ ...formData, reminder: checked })}
							/>
						</div>

						{formData.reminder && (
							<div className="grid gap-2">
								<Label htmlFor="reminder_time">Remind me (minutes before)</Label>
								<Input
									id="reminder_time"
									type="number"
									value={formData.reminder_time}
									onChange={(e) =>
										setFormData({ ...formData, reminder_time: parseInt(e.target.value) })
									}
								/>
							</div>
						)}

						<div className="grid gap-2">
							<Label htmlFor="status">Status</Label>
							<Select
								value={formData.status}
								onValueChange={(value) => setFormData({ ...formData, status: value })}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="scheduled">Scheduled</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
									<SelectItem value="cancelled">Cancelled</SelectItem>
									<SelectItem value="rescheduled">Rescheduled</SelectItem>
								</SelectContent>
							</Select>
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
