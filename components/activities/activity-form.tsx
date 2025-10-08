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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	jobId: string;
	activity?: {
		_id?: string;
		activity_type: string;
		title: string;
		description?: string;
		timestamp: string;
		metadata?: Record<string, unknown>;
	};
	onSuccess?: () => void;
}

export function ActivityForm({ open, onOpenChange, jobId, activity, onSuccess }: ActivityFormProps) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		activity_type: activity?.activity_type || 'custom',
		title: activity?.title || '',
		description: activity?.description || '',
		timestamp: activity?.timestamp ? new Date(activity.timestamp) : new Date(),
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = activity?._id ? `/api/activities/${activity._id}` : '/api/activities';
			const method = activity?._id ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					job_id: jobId,
					...formData,
					timestamp: formData.timestamp.toISOString(),
				}),
			});

			if (response.ok) {
				onOpenChange(false);
				onSuccess?.();
			}
		} catch (error) {
			console.error('Failed to save activity:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>{activity?._id ? 'Edit Activity' : 'Add Timeline Activity'}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="activity_type">Activity Type *</Label>
							<Select
								value={formData.activity_type}
								onValueChange={(value) => setFormData({ ...formData, activity_type: value })}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="saved">Saved Job</SelectItem>
									<SelectItem value="applied">Applied</SelectItem>
									<SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
									<SelectItem value="interview_done">Interview Done</SelectItem>
									<SelectItem value="assessment_received">Assessment Received</SelectItem>
									<SelectItem value="assessment_submitted">Assessment Submitted</SelectItem>
									<SelectItem value="follow_up_sent">Follow-Up Sent</SelectItem>
									<SelectItem value="offer_received">Offer Received</SelectItem>
									<SelectItem value="offer_accepted">Offer Accepted</SelectItem>
									<SelectItem value="offer_rejected">Offer Rejected</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
									<SelectItem value="withdrawn">Withdrawn</SelectItem>
									<SelectItem value="status_changed">Status Changed</SelectItem>
									<SelectItem value="note_added">Note Added</SelectItem>
									<SelectItem value="document_uploaded">Document Uploaded</SelectItem>
									<SelectItem value="custom">Custom Activity</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								required
								placeholder="e.g., Phone interview with hiring manager"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								rows={4}
								placeholder="Add details about this activity..."
							/>
						</div>

						<div className="grid gap-2">
							<Label>Date & Time *</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" className="justify-start text-left font-normal">
										<CalendarIcon className="mr-2 h-4 w-4" />
										{format(formData.timestamp, 'PPP')}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={formData.timestamp}
										onSelect={(date) => date && setFormData({ ...formData, timestamp: date })}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							{loading ? 'Saving...' : activity?._id ? 'Update Activity' : 'Add Activity'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
