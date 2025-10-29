'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Calendar } from 'lucide-react';
import { useEvents, deleteEvent, updateEvent } from '@/hooks/events';
import { EventForm } from './event-form';
import { EventView } from './view';
import { toast } from 'sonner';
import { SimpleTable } from '@/components/simple-table';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Spinner } from '../ui/shadcn-io/spinner';
import { Pagination } from '@/components/ui/pagination';
import { EmptyData } from '../dashboard/empty-data';
import { Checkbox } from '@/components/ui/checkbox';
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

export function EventsList() {
	const [createSheetOpen, setCreateSheetOpen] = useState(false);
	const [editSheetOpen, setEditSheetOpen] = useState(false);
	const [viewSheetOpen, setViewSheetOpen] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);
	const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [selectedJobId, setSelectedJobId] = useState<string>('');

	const {
		data: eventsData,
		error,
		mutate: mutateEvents,
	} = useEvents({
		page,
		limit: pageSize,
	});

	const events = eventsData?.data || [];
	const meta = eventsData?.meta;

	const handleDeleteClick = (event: Event) => {
		setDeletingEvent(event);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!deletingEvent) return;

		setIsDeleting(true);
		try {
			await deleteEvent(deletingEvent._id);
			toast.success('Event deleted successfully');
			mutateEvents();
		} catch {
			toast.error('Failed to delete event');
		} finally {
			setIsDeleting(false);
			setDeleteDialogOpen(false);
			setDeletingEvent(null);
		}
	};

	const handleViewEvent = (event: Event) => {
		setViewingEvent(event);
		setViewSheetOpen(true);
	};

	const handleEditEvent = (event: Event) => {
		setEditingEvent(event);
		setSelectedJobId(event.job_id._id);
		setEditSheetOpen(true);
	};

	const handleViewToEdit = () => {
		if (viewingEvent) {
			setViewSheetOpen(false);
			setEditingEvent(viewingEvent);
			setSelectedJobId(viewingEvent.job_id._id);
			setEditSheetOpen(true);
		}
	};

	const handleViewToDelete = () => {
		setViewSheetOpen(false);
		mutateEvents();
	};

	const handleToggleChecked = async (event: Event) => {
		try {
			await updateEvent(event._id, { is_checked: !event.is_checked });
			mutateEvents();
			toast.success('Event updated successfully');
		} catch {
			toast.error('Failed to update event');
		}
	};

	const handleCreateSuccess = () => {
		setCreateSheetOpen(false);
		setSelectedJobId('');
		mutateEvents();
	};

	const handleEditSuccess = () => {
		setEditSheetOpen(false);
		setEditingEvent(null);
		setSelectedJobId('');
		mutateEvents();
	};

	const handleViewSuccess = () => {
		setViewSheetOpen(false);
		setViewingEvent(null);
		mutateEvents();
	};

	const columns = [
		// {
		// 	key: 'is_checked',
		// 	header: '',
		// 	render: (value: unknown, row: Event) => (
		// 		<Checkbox
		// 			checked={Boolean(value)}
		// 			onCheckedChange={() => handleToggleChecked(row)}
		// 		/>
		// 	),
		// },
		// {
		// 	key: 'title',
		// 	header: 'Title',
		// 	render: (value: unknown) => (
		// 		<span className="max-w-xs truncate block">
		// 			{value ? String(value) : '-'}
		// 		</span>
		// 	),
		// },
		{
			key: 'job_id',
			header: 'Job',
			render: (value: unknown) => {
				const job = value as PopulatedJob;
				return (
					<div className="max-w-xs">
						<div className="font-medium truncate">{job?.title || '-'}</div>
						<div className="text-sm text-muted-foreground truncate">
							{job?.company_name || ''}
						</div>
					</div>
				);
			},
		},
		{
			key: 'content',
			header: 'Content',
			render: (value: unknown, row: Event) => (
				<>
					<span className="max-w-xs font-bold truncate block">
						{row?.title ? String(row.title) : ''}
					</span>
					<span className="max-w-md truncate block">
						{value ? String(value) : '-'}
					</span>
				</>
			),
		},

		{
			key: 'schedule_date',
			header: 'Scheduled Date',
			render: (value: unknown) => (
				<span className="whitespace-nowrap flex items-center gap-2">
					{value ? (
						<>
							<Calendar className="h-4 w-4 text-muted-foreground" />
							{format(new Date(String(value)), 'MMM d, yyyy')}
						</>
					) : (
						'-'
					)}
				</span>
			),
		},
		{
			key: 'createdAt',
			header: 'Created',
			render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
		},
	];

	const actions = [
		{
			label: 'View',
			onClick: (event: Event) => handleViewEvent(event),
			variant: 'secondary' as const,
		},
		{
			label: 'Edit',
			onClick: (event: Event) => handleEditEvent(event),
			variant: 'outline' as const,
		},
		{
			label: 'Delete',
			onClick: (event: Event) => handleDeleteClick(event),
			variant: 'destructive' as const,
		},
	];

	if (error) {
		return (
			<Card>
				<CardContent className="p-6">
					<p className="text-center text-red-500">Failed to load events</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Events ({meta?.total || 0})</h1>
				<div className="flex items-center gap-2">
					<Sheet open={createSheetOpen} onOpenChange={setCreateSheetOpen}>
						<SheetTrigger asChild>
							<Button>
								<Plus className="h-4 w-4 mr-2" />
								Add Event
							</Button>
						</SheetTrigger>
						<SheetContent>
							<div className="h-full">
								{/* Note: This will require job selection */}
								<p className="text-sm text-muted-foreground p-4">
									Please select a job from the jobs page to add events.
								</p>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			{/* Events Table */}
			<>
				<>
					{!eventsData && !error ? (
						<div className="flex items-center justify-center py-8">
							<Spinner variant="pinwheel" />
						</div>
					) : events.length === 0 ? (
						<EmptyData title="No Events" description="Add event from jobs" />
					) : (
						<>
							<SimpleTable
								data={events}
								columns={columns}
								actions={actions}
								showPagination={false}
							/>
							<Pagination
								currentPage={page}
								pageSize={pageSize}
								totalItems={meta?.total || 0}
								totalPages={meta?.totalPages || 1}
								onPageChange={setPage}
								onPageSizeChange={setPageSize}
								itemName="events"
							/>
						</>
					)}
				</>
			</>

			{/* View Sheet */}
			<Sheet open={viewSheetOpen} onOpenChange={setViewSheetOpen}>
				<SheetContent>
					<div className="h-full">
						{viewingEvent && (
							<EventView
								event={viewingEvent}
								onEdit={handleViewToEdit}
								onDelete={handleViewToDelete}
								onSuccess={handleViewSuccess}
							/>
						)}
					</div>
				</SheetContent>
			</Sheet>

			{/* Edit Sheet */}
			<Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
				<SheetContent>
					<div className="h-full">
						{editingEvent && selectedJobId && (
							<EventForm
								isOpen={true}
								onClose={() => {
									setEditSheetOpen(false);
									setEditingEvent(null);
									setSelectedJobId('');
								}}
								jobId={selectedJobId}
								event={editingEvent}
								onSuccess={handleEditSuccess}
							/>
						)}
					</div>
				</SheetContent>
			</Sheet>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				title="Delete Event"
				description={`Are you sure you want to delete "${
					deletingEvent?.title || 'this event'
				}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
				isLoading={isDeleting}
			/>
		</div>
	);
}
