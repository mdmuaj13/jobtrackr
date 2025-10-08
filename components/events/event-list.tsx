'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Calendar,
	Clock,
	MapPin,
	Video,
	User,
	Mail,
	Phone,
	Edit,
	Trash2,
	Plus,
} from 'lucide-react';
import { EventForm } from './event-form';
import { format, isPast, isFuture } from 'date-fns';
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
	status: string;
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
			const response = await fetch(`/api/events?job_id=${jobId}`);
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

	const handleDelete = async () => {
		if (!eventToDelete) return;

		try {
			const response = await fetch(`/api/events/${eventToDelete}`, {
				method: 'DELETE',
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

	const getEventTypeBadge = (type: string) => {
		const colors: Record<string, string> = {
			interview: 'bg-blue-500',
			submission: 'bg-green-500',
			follow_up: 'bg-yellow-500',
			assessment: 'bg-purple-500',
			offer_deadline: 'bg-red-500',
			other: 'bg-gray-500',
		};

		return (
			<Badge className={colors[type] || colors.other}>
				{type.replace('_', ' ').toUpperCase()}
			</Badge>
		);
	};

	const getStatusBadge = (status: string) => {
		const colors: Record<string, string> = {
			scheduled: 'bg-blue-500',
			completed: 'bg-green-500',
			cancelled: 'bg-red-500',
			rescheduled: 'bg-yellow-500',
		};

		return (
			<Badge variant="outline" className={colors[status]}>
				{status.toUpperCase()}
			</Badge>
		);
	};

	const isEventPast = (date: string, time?: string) => {
		const eventDate = new Date(date);
		if (time) {
			const [hours, minutes] = time.split(':');
			eventDate.setHours(parseInt(hours), parseInt(minutes));
		}
		return isPast(eventDate);
	};

	if (loading) {
		return <div className="text-center py-4">Loading events...</div>;
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Events & Deadlines</h3>
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
							No events scheduled yet. Add your first event!
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-3">
					{events.map((event) => (
						<Card
							key={event._id}
							className={isEventPast(event.date, event.time) ? 'opacity-60' : ''}
						>
							<CardHeader className="pb-3">
								<div className="flex justify-between items-start">
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<CardTitle className="text-base">{event.title}</CardTitle>
											{getEventTypeBadge(event.event_type)}
											{getStatusBadge(event.status)}
										</div>
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
							<CardContent className="space-y-2">
								{event.description && (
									<p className="text-sm text-muted-foreground">{event.description}</p>
								)}

								<div className="grid gap-2 text-sm">
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4 text-muted-foreground" />
										<span>{format(new Date(event.date), 'PPP')}</span>
									</div>

									{event.time && (
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span>
												{event.time}
												{event.duration && ` (${event.duration} minutes)`}
											</span>
										</div>
									)}

									{event.location && (
										<div className="flex items-center gap-2">
											<MapPin className="h-4 w-4 text-muted-foreground" />
											<span>{event.location}</span>
										</div>
									)}

									{event.meeting_link && (
										<div className="flex items-center gap-2">
											<Video className="h-4 w-4 text-muted-foreground" />
											<a
												href={event.meeting_link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-500 hover:underline"
											>
												Join Meeting
											</a>
										</div>
									)}

									{event.contact_person && (
										<div className="flex items-center gap-2">
											<User className="h-4 w-4 text-muted-foreground" />
											<span>{event.contact_person}</span>
										</div>
									)}

									{event.contact_email && (
										<div className="flex items-center gap-2">
											<Mail className="h-4 w-4 text-muted-foreground" />
											<a
												href={`mailto:${event.contact_email}`}
												className="text-blue-500 hover:underline"
											>
												{event.contact_email}
											</a>
										</div>
									)}

									{event.contact_phone && (
										<div className="flex items-center gap-2">
											<Phone className="h-4 w-4 text-muted-foreground" />
											<a
												href={`tel:${event.contact_phone}`}
												className="text-blue-500 hover:underline"
											>
												{event.contact_phone}
											</a>
										</div>
									)}
								</div>

								{event.notes && (
									<div className="mt-3 p-3 bg-muted rounded-md">
										<p className="text-sm text-muted-foreground">{event.notes}</p>
									</div>
								)}
							</CardContent>
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
