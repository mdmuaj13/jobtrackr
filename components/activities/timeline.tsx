'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Calendar,
	CheckCircle2,
	Send,
	FileText,
	MessageSquare,
	Award,
	XCircle,
	Clock,
	Edit,
	Trash2,
	Plus,
	AlertCircle,
	Upload,
	RefreshCw,
} from 'lucide-react';
import { ActivityForm } from './activity-form';
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

interface Activity {
	_id: string;
	activity_type: string;
	title: string;
	description?: string;
	timestamp: string;
	metadata?: Record<string, unknown>;
}

interface TimelineProps {
	jobId: string;
}

export function Timeline({ jobId }: TimelineProps) {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingActivity, setEditingActivity] = useState<Activity | undefined>();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [activityToDelete, setActivityToDelete] = useState<string | null>(null);

	const fetchActivities = async () => {
		try {
			const response = await fetch(`/api/activities?job_id=${jobId}`);
			if (response.ok) {
				const data = await response.json();
				setActivities(data.data || []);
			}
		} catch (error) {
			console.error('Failed to fetch activities:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchActivities();
	}, [jobId]);

	const handleDelete = async () => {
		if (!activityToDelete) return;

		try {
			const response = await fetch(`/api/activities/${activityToDelete}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				fetchActivities();
			}
		} catch (error) {
			console.error('Failed to delete activity:', error);
		} finally {
			setDeleteDialogOpen(false);
			setActivityToDelete(null);
		}
	};

	const getActivityIcon = (type: string) => {
		const iconClass = 'h-5 w-5';
		switch (type) {
			case 'saved':
				return <Calendar className={iconClass} />;
			case 'applied':
				return <Send className={iconClass} />;
			case 'interview_scheduled':
				return <Clock className={iconClass} />;
			case 'interview_done':
				return <CheckCircle2 className={iconClass} />;
			case 'assessment_received':
				return <FileText className={iconClass} />;
			case 'assessment_submitted':
				return <CheckCircle2 className={iconClass} />;
			case 'follow_up_sent':
				return <MessageSquare className={iconClass} />;
			case 'offer_received':
				return <Award className={iconClass} />;
			case 'offer_accepted':
				return <CheckCircle2 className={iconClass} />;
			case 'offer_rejected':
			case 'rejected':
				return <XCircle className={iconClass} />;
			case 'withdrawn':
				return <AlertCircle className={iconClass} />;
			case 'document_uploaded':
				return <Upload className={iconClass} />;
			case 'status_changed':
				return <RefreshCw className={iconClass} />;
			default:
				return <Calendar className={iconClass} />;
		}
	};

	const getActivityColor = (type: string) => {
		switch (type) {
			case 'saved':
				return 'bg-gray-500';
			case 'applied':
				return 'bg-blue-500';
			case 'interview_scheduled':
				return 'bg-purple-500';
			case 'interview_done':
				return 'bg-indigo-500';
			case 'assessment_received':
			case 'assessment_submitted':
				return 'bg-cyan-500';
			case 'follow_up_sent':
				return 'bg-yellow-500';
			case 'offer_received':
				return 'bg-green-500';
			case 'offer_accepted':
				return 'bg-emerald-500';
			case 'offer_rejected':
			case 'rejected':
				return 'bg-red-500';
			case 'withdrawn':
				return 'bg-orange-500';
			case 'document_uploaded':
				return 'bg-teal-500';
			case 'status_changed':
				return 'bg-slate-500';
			default:
				return 'bg-gray-500';
		}
	};

	if (loading) {
		return <div className="text-center py-4">Loading timeline...</div>;
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Activity Timeline</h3>
				<Button
					onClick={() => {
						setEditingActivity(undefined);
						setShowForm(true);
					}}
					size="sm"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Activity
				</Button>
			</div>

			{activities.length === 0 ? (
				<Card>
					<CardContent className="pt-6">
						<p className="text-center text-muted-foreground">
							No activities yet. Start tracking your job application journey!
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

					<div className="space-y-4">
						{activities.map((activity, index) => (
							<div key={activity._id} className="relative flex gap-4 group">
								{/* Timeline dot */}
								<div className="relative z-10 flex-shrink-0">
									<div
										className={`flex items-center justify-center w-12 h-12 rounded-full ${getActivityColor(
											activity.activity_type
										)} text-white`}
									>
										{getActivityIcon(activity.activity_type)}
									</div>
								</div>

								{/* Content */}
								<Card className="flex-1">
									<CardHeader className="pb-3">
										<div className="flex justify-between items-start">
											<div className="space-y-1 flex-1">
												<div className="flex items-center gap-2">
													<CardTitle className="text-base">{activity.title}</CardTitle>
													<Badge variant="outline" className="text-xs">
														{activity.activity_type.replace(/_/g, ' ').toUpperCase()}
													</Badge>
												</div>
												<p className="text-sm text-muted-foreground">
													{format(new Date(activity.timestamp), 'PPP')}
												</p>
											</div>
											<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														setEditingActivity(activity);
														setShowForm(true);
													}}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														setActivityToDelete(activity._id);
														setDeleteDialogOpen(true);
													}}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</CardHeader>
									{activity.description && (
										<CardContent>
											<p className="text-sm text-muted-foreground whitespace-pre-wrap">
												{activity.description}
											</p>
										</CardContent>
									)}
								</Card>
							</div>
						))}
					</div>
				</div>
			)}

			<ActivityForm
				open={showForm}
				onOpenChange={setShowForm}
				jobId={jobId}
				activity={editingActivity}
				onSuccess={fetchActivities}
			/>

			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Activity</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this activity? This action cannot be undone.
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
