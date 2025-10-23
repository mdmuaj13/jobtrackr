'use client';

import { useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useCalendarJobs, CalendarJob } from '@/hooks/calendar';
import { Calendar as CalendarIcon, MapPin, Briefcase, Clock } from 'lucide-react';

const locales = {
	'en-US': enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

interface CalendarEvent extends Event {
	job: CalendarJob;
	eventType: 'deadline' | 'applied';
}

export function CalendarView() {
	const { data: jobs, isLoading, error } = useCalendarJobs();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const events: CalendarEvent[] = useMemo(() => {
		const eventList: CalendarEvent[] = [];

		if (!jobs) return eventList;

		jobs.forEach((job) => {
			// Add deadline event
			if (job.deadline) {
				eventList.push({
					title: `Deadline: ${job.title}`,
					start: new Date(job.deadline),
					end: new Date(job.deadline),
					job,
					eventType: 'deadline',
				});
			}

			// Add applied date event
			if (job.applied_date) {
				eventList.push({
					title: `Applied: ${job.title}`,
					start: new Date(job.applied_date),
					end: new Date(job.applied_date),
					job,
					eventType: 'applied',
				});
			}
		});

		return eventList;
	}, [jobs]);

	// Filter jobs for selected date
	const selectedDateJobs = useMemo(() => {
		if (!selectedDate || !jobs) return [];

		return jobs.filter((job) => {
			const hasDeadline = job.deadline && isSameDay(new Date(job.deadline), selectedDate);
			const hasAppliedDate = job.applied_date && isSameDay(new Date(job.applied_date), selectedDate);
			return hasDeadline || hasAppliedDate;
		});
	}, [selectedDate, jobs]);

	const eventStyleGetter = (event: CalendarEvent) => {
		const style: React.CSSProperties = {
			borderRadius: '4px',
			opacity: 0.8,
			border: '0px',
			display: 'block',
			fontSize: '0.75rem',
			padding: '2px 4px',
		};

		if (event.eventType === 'deadline') {
			// Deadline events - orange/red
			style.backgroundColor = '#f97316';
			style.color = 'white';
		} else {
			// Applied events - green
			style.backgroundColor = '#22c55e';
			style.color = 'white';
		}

		return { style };
	};

	const CustomEvent = ({ event }: { event: CalendarEvent }) => {
		return (
			<div className="p-0.5">
				<div className="font-medium text-[10px] leading-tight truncate">
					{event.job.company_name}
				</div>
				<div className="text-[10px] leading-tight truncate">
					{event.job.title}
				</div>
			</div>
		);
	};

	// Handle date selection
	const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
		setSelectedDate(slotInfo.start);
	};

	const handleSelectEvent = (event: CalendarEvent) => {
		setSelectedDate(event.start as Date);
	};

	// Render date preview panel
	const renderDatePreviewPanel = () => {
		if (!selectedDate) {
			return (
				<Card className="h-full">
					<CardContent className="p-6 flex items-center justify-center h-full">
						<div className="text-center text-muted-foreground">
							<CalendarIcon className="mx-auto h-12 w-12 mb-3 opacity-50" />
							<p className="text-sm">Select a date to view jobs</p>
						</div>
					</CardContent>
				</Card>
			);
		}

		return (
			<Card className="h-full flex flex-col">
				<CardHeader className="border-b">
					<CardTitle className="text-lg flex items-center gap-2">
						<CalendarIcon className="h-5 w-5" />
						{format(selectedDate, 'MMMM d, yyyy')}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0 flex-1 overflow-y-auto">
					{selectedDateJobs.length === 0 ? (
						<div className="p-6 text-center text-muted-foreground">
							<p className="text-sm">No jobs scheduled for this date</p>
						</div>
					) : (
						<div className="divide-y">
							{selectedDateJobs.map((job) => {
								const hasDeadline = job.deadline && isSameDay(new Date(job.deadline), selectedDate);
								const hasAppliedDate = job.applied_date && isSameDay(new Date(job.applied_date), selectedDate);

								return (
									<div key={job._id} className="p-4 hover:bg-muted/50 transition-colors">
										<div className="space-y-3">
											<div>
												<h3 className="font-semibold text-base mb-1">{job.title}</h3>
												<p className="text-sm text-muted-foreground font-medium">{job.company_name}</p>
											</div>

											<div className="flex flex-wrap gap-2">
												{hasDeadline && (
													<Badge variant="destructive" className="text-xs">
														<Clock className="h-3 w-3 mr-1" />
														Deadline
													</Badge>
												)}
												{hasAppliedDate && (
													<Badge variant="default" className="text-xs bg-green-500 hover:bg-green-600">
														<CalendarIcon className="h-3 w-3 mr-1" />
														Applied
													</Badge>
												)}
												<Badge variant="outline" className="text-xs">
													{job.status}
												</Badge>
											</div>

											<div className="space-y-1.5 text-sm text-muted-foreground">
												{job.location && (
													<div className="flex items-center gap-2">
														<MapPin className="h-4 w-4" />
														<span>{job.location}</span>
													</div>
												)}
												{job.job_type && (
													<div className="flex items-center gap-2">
														<Briefcase className="h-4 w-4" />
														<span>{job.job_type}</span>
														{job.work_mode && <span>• {job.work_mode}</span>}
													</div>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</CardContent>
			</Card>
		);
	};

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2">
					<Card>
						<CardContent className="p-6">
							<Skeleton className="h-[700px] w-full" />
						</CardContent>
					</Card>
				</div>
				<div>
					<Skeleton className="h-[700px] w-full" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<Card>
				<CardContent className="p-6">
					<p className="text-center text-red-500">Failed to load calendar</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			{/* Calendar Section */}
			<div className="lg:col-span-2">
				<Card>
					<CardContent className="p-6">
						<div className="mb-4 flex gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-orange-500 rounded"></div>
								<span className="text-sm">Deadline</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-green-500 rounded"></div>
								<span className="text-sm">Applied</span>
							</div>
						</div>
						<div className="h-[700px] calendar-container">
							<Calendar
								localizer={localizer}
								events={events}
								startAccessor="start"
								endAccessor="end"
								style={{ height: '100%' }}
								eventPropGetter={eventStyleGetter}
								components={{
									event: CustomEvent,
								}}
								onSelectSlot={handleSelectSlot}
								onSelectEvent={handleSelectEvent}
								selectable
							/>
						</div>
				<style jsx global>{`
					.calendar-container .rbc-calendar {
						font-family: inherit;
					}

					.calendar-container .rbc-header {
						@apply py-2.5 px-1 font-semibold text-sm border-b bg-muted;
					}

					.calendar-container .rbc-today {
						@apply bg-primary/10;
					}

					.calendar-container .rbc-now {
						@apply text-primary font-bold;
					}

					.calendar-container .rbc-current-time-indicator {
						@apply bg-primary;
					}

					.calendar-container .rbc-off-range-bg {
						@apply bg-muted/30;
					}

					.calendar-container .rbc-month-view {
						@apply border rounded-lg overflow-hidden;
					}

					.calendar-container .rbc-day-bg {
						@apply border-l;
					}

					.calendar-container .rbc-month-row {
						@apply border-t;
					}

					.calendar-container .rbc-date-cell {
						@apply p-1 text-right text-sm;
					}

					.calendar-container .rbc-date-cell.rbc-now {
						@apply font-bold;
					}

					.calendar-container .rbc-date-cell.rbc-now a {
						@apply font-bold bg-primary text-white w-7 h-7 rounded-full inline-flex items-center justify-center;
					}

					.calendar-container .rbc-event {
						@apply px-1 py-0.5 cursor-pointer;
					}

					.calendar-container .rbc-event:hover {
						opacity: 1 !important;
					}

					.calendar-container .rbc-event-label {
						@apply text-xs;
					}

					.calendar-container .rbc-show-more {
						@apply bg-primary text-primary-foreground text-xs py-0.5 px-1 rounded-sm m-0.5;
					}

					.calendar-container .rbc-toolbar {
						@apply py-2.5 mb-2.5 flex justify-between items-center;
					}

					.calendar-container .rbc-toolbar button {
						@apply py-1.5 px-3 border bg-background text-foreground rounded-md text-sm cursor-pointer transition-all duration-200;
					}

					.calendar-container .rbc-toolbar button:hover {
						@apply bg-accent;
					}

					.calendar-container .rbc-toolbar button:active,
					.calendar-container .rbc-toolbar button.rbc-active {
						@apply bg-primary text-primary-foreground border-primary;
					}

					.calendar-container .rbc-toolbar-label {
						@apply font-semibold text-lg;
					}
				`}</style>
					</CardContent>
				</Card>
			</div>

			{/* Date Preview Panel */}
			<div className="h-[780px]">
				{renderDatePreviewPanel()}
			</div>
		</div>
	);
}
