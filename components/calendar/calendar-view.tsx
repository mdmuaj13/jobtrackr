'use client';

import { useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCalendarJobs, CalendarJob } from '@/hooks/calendar';
import { Calendar as CalendarIcon, MapPin, Briefcase, Clock, X } from 'lucide-react';

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
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

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
		setIsPanelOpen(true);
	};

	const handleSelectEvent = (event: CalendarEvent) => {
		setSelectedDate(event.start as Date);
		setIsPanelOpen(true);
	};

	// Handle panel close
	const handleClosePanel = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsPanelOpen(false);
			setSelectedDate(null);
			setIsClosing(false);
		}, 300); // Match animation duration
	};

	// Render date preview panel
	const renderDatePreviewPanel = () => {
		if (!selectedDate) return null;

		return (
			<Card className="group relative overflow-hidden border-2 hover:border-chart-3 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-chart-3/5 to-transparent h-full flex flex-col">
				<CardHeader className="border-b-2 border-chart-3/20 shrink-0">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg flex items-center gap-2">
							<CalendarIcon className="h-5 w-5" />
							{format(selectedDate, 'MMMM d, yyyy')}
						</CardTitle>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleClosePanel}
							className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</CardHeader>
				<CardContent className="p-0 flex-1 overflow-y-auto">
					{selectedDateJobs.length === 0 ? (
						<div className="p-6 text-center text-muted-foreground">
							<p className="text-sm">No jobs scheduled for this date</p>
						</div>
					) : (
						<div className="divide-y divide-muted">
							{selectedDateJobs.map((job) => {
								const hasDeadline = job.deadline && isSameDay(new Date(job.deadline), selectedDate);
								const hasAppliedDate = job.applied_date && isSameDay(new Date(job.applied_date), selectedDate);

								return (
									<div key={job._id} className="p-4 hover:bg-accent/30 transition-colors">
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
													<Badge variant="default" className="text-xs bg-emerald-500 hover:bg-emerald-600">
														<CalendarIcon className="h-3 w-3 mr-1" />
														Applied
													</Badge>
												)}
												{job.status && (
													<Badge variant="outline" className="text-xs capitalize border-primary/30">
														{job.status}
													</Badge>
												)}
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
			<Card className="group relative overflow-hidden border-2 hover:border-chart-5 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-chart-5/5 to-transparent">
				<CardContent className="p-6">
					<div className="mb-4 flex gap-4">
						<div className="flex items-center gap-2">
							<Skeleton className="w-4 h-4 rounded" />
							<Skeleton className="h-4 w-16" />
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="w-4 h-4 rounded" />
							<Skeleton className="h-4 w-16" />
						</div>
					</div>
					<Skeleton className="h-[700px] w-full rounded-lg" />
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card className="group relative overflow-hidden border-2 hover:border-chart-5 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-chart-5/5 to-transparent">
				<CardContent className="p-6">
					<p className="text-center text-destructive font-medium">Failed to load calendar</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className={`grid grid-cols-1 gap-4 ${isPanelOpen ? 'lg:grid-cols-3' : ''}`}>
			{/* Calendar Section */}
			<div className={isPanelOpen ? 'lg:col-span-2' : ''}>
				<Card className="group relative overflow-hidden border-2 hover:border-chart-5 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-chart-5/5 to-transparent">
					<CardContent className="p-6">
						<div className="mb-4 flex gap-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-destructive rounded"></div>
								<span className="text-sm font-medium">Deadline</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-emerald-500 rounded"></div>
								<span className="text-sm font-medium">Applied</span>
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
								toolbar
								views={['month', 'week', 'day']}
								defaultView="month"
								date={currentDate}
								onNavigate={(newDate) => setCurrentDate(newDate)}
							/>
						</div>
				<style jsx global>{`
					.calendar-container .rbc-calendar {
						font-family: inherit;
					}

					.calendar-container .rbc-header {
						@apply py-2.5 px-1 font-semibold text-sm border-b bg-muted rounded-t-md;
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
						@apply border-2 rounded-lg overflow-hidden bg-background/50;
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
						@apply font-bold bg-primary text-white w-7 h-7 rounded-full inline-flex items-center justify-center shadow-md;
					}

					.calendar-container .rbc-event {
						@apply px-1 py-0.5 cursor-pointer rounded-sm shadow-sm;
					}

					.calendar-container .rbc-event:hover {
						opacity: 1 !important;
						@apply shadow-md;
					}

					.calendar-container .rbc-event-label {
						@apply text-xs;
					}

					.calendar-container .rbc-show-more {
						@apply bg-primary/80 text-primary-foreground text-xs py-0.5 px-1.5 rounded-sm m-0.5 shadow-sm;
					}

					.calendar-container .rbc-toolbar {
						@apply py-3 mb-3 flex justify-between items-center border-b border-gray-200 pb-4;
					}

					.calendar-container .rbc-toolbar button {
						@apply py-2 px-4 border-2 bg-background text-foreground rounded-md text-sm cursor-pointer transition-all duration-200 hover:bg-accent;
					}

					.calendar-container .rbc-toolbar button:hover {
						@apply bg-accent border-primary text-primary;
					}

					.calendar-container .rbc-toolbar button:active,
					.calendar-container .rbc-toolbar button.rbc-active {
						@apply bg-primary text-primary-foreground border-primary shadow-md;
					}

					.calendar-container .rbc-toolbar-label {
						@apply font-bold text-lg text-foreground;
					}
				`}</style>
					</CardContent>
				</Card>
			</div>

			{/* Date Preview Panel */}
			{isPanelOpen && (
				<div className={`h-[780px] transition-all duration-300 ${
					isClosing
						? 'animate-out fade-out slide-out-to-right-5'
						: 'animate-in fade-in slide-in-from-right-5'
				}`}>
					{renderDatePreviewPanel()}
				</div>
			)}
		</div>
	);
}
