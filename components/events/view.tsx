'use client';

import { useState } from 'react';
import { deleteEvent, updateEvent } from '@/hooks/events';
import { EntityView } from '@/components/ui/entity-view';
import { ViewField, formatDate } from '@/components/ui/view-field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, X, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface PopulatedJob {
	_id: string;
	title: string;
	company_name: string;
	status: string;
}

interface Event {
	_id: string;
	job_id: PopulatedJob;
	title?: string;
	content: string;
	schedule_date?: string;
	is_checked: boolean;
	createdAt: string;
	updatedAt: string;
}

interface EventViewProps {
	event: Event;
	onEdit?: () => void;
	onDelete?: () => void;
	onSuccess?: () => void;
}

export function EventView({
	event: initialEvent,
	onEdit,
	onDelete,
	onSuccess,
}: EventViewProps) {
	const [event, setEvent] = useState(initialEvent);
	const [isTogglingCheck, setIsTogglingCheck] = useState(false);

	const handleToggleCheck = async () => {
		setIsTogglingCheck(true);
		try {
			const response = await updateEvent(event._id, {
				is_checked: !event.is_checked,
			});
			setEvent((prev) => ({ ...prev, is_checked: !prev.is_checked }));
			toast.success(
				`Event marked as ${!event.is_checked ? 'completed' : 'incomplete'}`
			);
			onSuccess?.();
		} catch {
			toast.error('Failed to update event status');
		} finally {
			setIsTogglingCheck(false);
		}
	};

	return (
		<EntityView
			title="Event Details"
			entity={event}
			entityName="Event"
			getEntityDisplayName={(e) => e.title || e.content}
			onEdit={onEdit}
			onDelete={onDelete}
			onSuccess={onSuccess}
			deleteFunction={deleteEvent}
			customActions={
				<Button
					onClick={handleToggleCheck}
					disabled={isTogglingCheck}
					variant={event.is_checked ? 'outline' : 'default'}
					className="w-full">
					{event.is_checked ? (
						<>
							<X className="h-4 w-4 mr-2" />
							{isTogglingCheck ? 'Updating...' : 'Mark as Incomplete'}
						</>
					) : (
						<>
							<Check className="h-4 w-4 mr-2" />
							{isTogglingCheck ? 'Updating...' : 'Mark as Completed'}
						</>
					)}
				</Button>
			}>
			{event.title && (
				<ViewField
					label="Title"
					value={<p className="text-sm font-semibold">{event.title}</p>}
				/>
			)}

			<ViewField
				label="Content"
				value={<p className="text-sm whitespace-pre-wrap">{event.content}</p>}
			/>

			<ViewField
				label="Job"
				value={
					<div>
						<p className="text-sm font-medium">
							{event.job_id?.title || 'N/A'}
						</p>
						{event.job_id?.company_name && (
							<p className="text-sm text-muted-foreground">
								{event.job_id.company_name}
							</p>
						)}
						{event.job_id?.status && (
							<Badge variant="outline" className="mt-1">
								{event.job_id.status.charAt(0).toUpperCase() +
									event.job_id.status.slice(1)}
							</Badge>
						)}
					</div>
				}
			/>

			<ViewField
				label="Scheduled Date"
				value={
					event.schedule_date ? (
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<p className="text-sm">
								{format(new Date(event.schedule_date), 'EEEE, MMMM d, yyyy')}
							</p>
						</div>
					) : (
						<p className="text-sm text-muted-foreground">No date scheduled</p>
					)
				}
			/>
			<Badge variant={event.is_checked ? 'default' : 'secondary'}>
				{event.is_checked ? 'Completed' : 'Pending'}
			</Badge>

			<div className="grid grid-cols-2 gap-4">
				<ViewField
					label="Created"
					value={<p className="text-sm">{formatDate(event.createdAt)}</p>}
				/>

				{/* <ViewField
					label="Last Updated"
					value={<p className="text-sm">{formatDate(event.updatedAt)}</p>}
				/> */}
			</div>
		</EntityView>
	);
}
