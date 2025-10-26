'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Calendar,
	Edit,
	Trash2,
	Plus,
} from 'lucide-react';
import { EventForm } from './event-form';
import { format } from 'date-fns';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Event {
	_id: string;
	title?: string;
	content: string;
	schedule_date?: string;
	is_checked: boolean;
}

interface EventListProps {
	jobId: string;
}

export function EventList({ jobId }: EventListProps) {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | undefined>();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [eventToDelete, setEventToDelete] = useState<string | null>(null);

	const fetchEvents = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`/api/events?job_id=${jobId}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setEvents(data.data || []);
			}
		} catch (error) {
			console.error('Failed to fetch events:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, [jobId]);

	const handleToggleChecked = async (eventId: string, currentValue: boolean) => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`/api/events/${eventId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({ is_checked: !currentValue }),
			});

			if (response.ok) {
				fetchEvents();
			}
		} catch (error) {
			console.error('Failed to update event:', error);
		}
	};

	const handleDelete = async () => {
		if (!eventToDelete) return;

		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`/api/events/${eventToDelete}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			if (response.ok) {
				fetchEvents();
			}
		} catch (error) {
			console.error('Failed to delete event:', error);
		} finally {
			setDeleteDialogOpen(false);
			setEventToDelete(null);
		}
	};

	if (loading) {
		return <div className="text-center py-4">Loading events...</div>;
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Events</h3>
				<Button
					onClick={() => {
						setEditingEvent(undefined);
						setShowForm(true);
					}}
					size="sm"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Event
				</Button>
			</div>

			{events.length === 0 ? (
				<Card>
					<CardContent className="pt-6">
						<p className="text-center text-muted-foreground">
							No events added yet. Click "Add Event" to create one!
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-3">
					{events.map((event) => (
						<Card
							key={event._id}
							className={event.is_checked ? 'opacity-60' : ''}
						>
							<CardHeader className="pb-3">
								<div className="flex items-start gap-3">
									<Checkbox
										checked={event.is_checked}
										onCheckedChange={() => handleToggleChecked(event._id, event.is_checked)}
										className="mt-1"
									/>
									<div className="flex-1 space-y-1">
										{event.title && (
											<CardTitle className="text-base">{event.title}</CardTitle>
										)}
										<p className={`text-sm ${event.is_checked ? 'line-through text-muted-foreground' : ''}`}>
											{event.content}
										</p>
										{event.schedule_date && (
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<Calendar className="h-4 w-4" />
												<span>{format(new Date(event.schedule_date), 'PPP')}</span>
											</div>
										)}
									</div>
									<div className="flex gap-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												setEditingEvent(event);
												setShowForm(true);
											}}
										>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												setEventToDelete(event._id);
												setDeleteDialogOpen(true);
											}}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</CardHeader>
						</Card>
					))}
				</div>
			)}

			<EventForm
				open={showForm}
				onOpenChange={setShowForm}
				jobId={jobId}
				event={editingEvent}
				onSuccess={fetchEvents}
			/>

			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Event</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this event? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
