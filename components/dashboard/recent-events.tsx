'use client';

import { IconCalendar, IconBriefcase, IconCircleCheck, IconCircle } from '@tabler/icons-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PopulatedJob {
	_id: string;
	title: string;
	company_name: string;
	status: string;
}

interface RecentEvent {
	_id: string;
	job_id: PopulatedJob;
	title?: string;
	content: string;
	schedule_date?: string;
	is_checked: boolean;
	createdAt: string;
	updatedAt: string;
}

interface RecentEventsProps {
	events: RecentEvent[];
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'saved':
			return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
		case 'applied':
			return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
		case 'interviewing':
			return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
		case 'offered':
			return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
		case 'rejected':
			return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
		case 'accepted':
			return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
		case 'withdrawn':
			return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
		default:
			return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
	}
};

export function RecentEvents({ events }: RecentEventsProps) {
	if (!events || events.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="rounded-full bg-muted p-4 mb-4">
					<IconCalendar className="h-8 w-8 text-muted-foreground" />
				</div>
				<p className="text-sm font-medium mb-1">No events yet</p>
				<p className="text-xs text-muted-foreground max-w-xs">
					Create events to track important dates and milestones
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{events.map((event, index) => (
				<div
					key={event._id}
					className={cn(
						"group relative p-3 rounded-lg border transition-all duration-200 hover:shadow-sm hover:border-foreground/30",
						"bg-card"
					)}>
					{/* Decorative Line */}
					<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-foreground/30 to-transparent rounded-l-lg" />

					<div className="flex items-start gap-2.5 pl-1.5">
						{/* Checkbox Icon */}
						<div className="flex-shrink-0 mt-0.5">
							{event.is_checked ? (
								<IconCircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
							) : (
								<IconCircle className="h-4 w-4 text-muted-foreground" />
							)}
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0 space-y-1.5">
							{/* Title and Date */}
							<div className="flex items-start justify-between gap-2">
								<div className="flex-1 min-w-0">
									{event.title && (
										<h4 className="font-semibold text-sm truncate">
											{event.title}
										</h4>
									)}
									<p className={cn(
										"text-xs text-muted-foreground line-clamp-1",
										event.is_checked && "line-through opacity-60"
									)}>
										{event.content}
									</p>
								</div>
								{event.schedule_date && (
									<div className="flex-shrink-0 flex items-center gap-1 text-xs text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded">
										<IconCalendar className="h-3 w-3" />
										<span>{format(new Date(event.schedule_date), 'MMM d')}</span>
									</div>
								)}
							</div>

							{/* Job Info */}
							<div className="flex items-center gap-1.5 flex-wrap">
								<div className="flex items-center gap-1 text-xs">
									<IconBriefcase className="h-3 w-3 text-muted-foreground" />
									<span className="font-medium truncate max-w-[150px]">
										{event.job_id.title}
									</span>
								</div>
								<span className="text-xs text-muted-foreground">•</span>
								<span className="text-xs text-muted-foreground truncate max-w-[120px]">
									{event.job_id.company_name}
								</span>
								<Badge
									variant="secondary"
									className={cn(
										"text-xs capitalize px-1.5 py-0",
										getStatusColor(event.job_id.status)
									)}>
									{event.job_id.status}
								</Badge>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
