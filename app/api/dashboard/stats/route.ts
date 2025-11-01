import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';
import Event from '@/models/Event';
import { authenticateToken } from '@/lib/auth';
import { ApiSerializer } from '@/types';
import { Types } from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		await connectDB();

		const { error: authError, user } = await authenticateToken(req);
		if (authError) return authError;

		const now = new Date();
		const todayStart = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		);
		const todayEnd = new Date(todayStart);
		todayEnd.setDate(todayEnd.getDate() + 1);

		const weekEnd = new Date(todayStart);
		weekEnd.setDate(weekEnd.getDate() + 7);

		// Aggregate job data with statistics and recent jobs using $facet
		const jobAggregation = await Job.aggregate([
			{
				$match: {
					deletedAt: null,
					user_id: new Types.ObjectId(user?.id),
				},
			},
			{
				$facet: {
					jobStats: [
						{
							$group: {
								_id: null,
								applied: {
									$sum: {
										$cond: [
											{
												$in: [
													'$status',
													['applied', 'interviewing', 'offered', 'accepted'],
												],
											},
											1,
											0,
										],
									}
								},
								notApplied: {
									$sum: {
										$cond: [{ $eq: ['$status', 'saved'] }, 1, 0],
									},
								},
								deadlineToday: {
									$sum: {
										$cond: [
											{
												$and: [
													{ $gte: ['$deadline', todayStart] },
													{ $lt: ['$deadline', todayEnd] },
												],
											},
											1,
											0,
										],
									}
								},
								deadlineWeek: {
									$sum: {
										$cond: [
											{
												$and: [
													{ $gte: ['$deadline', todayStart] },
													{ $lt: ['$deadline', weekEnd] },
												],
											},
											1,
											0,
										],
									}
								},
								interviewing: {
									$sum: {
										$cond: [{ $eq: ['$status', 'interviewing'] }, 1, 0],
									},
								},
							},
						},
					],
					recentNotAppliedJobs: [
						{
							$match: {
								status: 'saved',
							},
						},
						{
							$sort: { createdAt: -1 },
						},
						{
							$limit: 5,
						},
					],
					interviewingJobs: [
						{
							$match: {
								status: 'interviewing',
							},
						},
						{
							$sort: { updatedAt: -1 },
						},
						{
							$limit: 5,
						},
					],
				},
			},
		]);

		// Extract results from aggregation
		const jobStats = jobAggregation[0]?.jobStats[0] || {
			applied: 0,
			notApplied: 0,
			deadlineToday: 0,
			deadlineWeek: 0,
			interviewing: 0,
		};

		const recentNotAppliedJobs = jobAggregation[0]?.recentNotAppliedJobs || [];
		const interviewingJobs = jobAggregation[0]?.interviewingJobs || [];

		// Aggregate event data with statistics and recent events using $facet
		const eventAggregation = await Event.aggregate([
			{
				$match: {
					deletedAt: null,
					user_id: new Types.ObjectId(user?.id),
				},
			},
			{
				$facet: {
					eventStats: [
						{
							$group: {
								_id: null,
								total: { $sum: 1 },
								completed: {
									$sum: {
										$cond: [{ $eq: ['$is_checked', true] }, 1, 0],
									},
								},
								pending: {
									$sum: {
										$cond: [{ $eq: ['$is_checked', false] }, 1, 0],
									},
								},
								upcoming: {
									$sum: {
										$cond: [{ $gte: ['$schedule_date', todayStart] }, 1, 0],
									},
								},
							},
						},
					],
					recentEvents: [
						{
							$lookup: {
								from: 'jobs',
								localField: 'job_id',
								foreignField: '_id',
								as: 'populatedJob',
							},
						},
						{
							$addFields: {
								job_id: {
									$cond: {
										if: { $gt: [{ $size: '$populatedJob' }, 0] },
										then: {
											_id: { $arrayElemAt: ['$populatedJob._id', 0] },
											title: { $arrayElemAt: ['$populatedJob.title', 0] },
											company_name: { $arrayElemAt: ['$populatedJob.company_name', 0] },
											status: { $arrayElemAt: ['$populatedJob.status', 0] },
										},
										else: null,
									},
								},
							},
						},
						{
							$sort: { createdAt: -1 },
						},
						{
							$limit: 5,
						},
						{
							$project: {
								populatedJob: 0, // Remove the temporary populatedJob field
							},
						},
					],
				},
			},
		]);

		// Extract results from aggregation
		const eventStats = eventAggregation[0]?.eventStats[0] || {
			total: 0,
			completed: 0,
			pending: 0,
			upcoming: 0,
		};

		const recentEvents = eventAggregation[0]?.recentEvents || [];

		return ApiSerializer.success({
			stats: {
				applied: jobStats.applied,
				notApplied: jobStats.notApplied,
				deadlineToday: jobStats.deadlineToday,
				interviewing: jobStats.interviewing,
			},
			eventStats: {
				total: eventStats.total,
				completed: eventStats.completed,
				pending: eventStats.pending,
				upcoming: eventStats.upcoming,
			},
			recentNotAppliedJobs,
			interviewingJobs,
			recentEvents,
		});
	} catch (error) {
		console.error('Dashboard stats error:', error);
		return ApiSerializer.error('Failed to fetch dashboard stats', 500);
	}
}
