'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface JobStats {
	jobsApplied: number;
	jobsListed: number;
	deadlineEndedNotApplied: number;
}

export function JobStatsChart() {
	const [stats, setStats] = useState<JobStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch('/api/dashboard/job-stats');
				if (!response.ok) throw new Error('Failed to fetch');
				const result = await response.json();
				setStats(result.data);
			} catch (err) {
				console.error('Error fetching job stats:', err);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (isLoading) {
		return (
			<Card className="h-full">
				<CardHeader className="pb-3">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-3 w-40 mt-2" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-48 w-full" />
				</CardContent>
			</Card>
		);
	}

	if (error || !stats) {
		return (
			<Card className="h-full">
				<CardHeader className="pb-3">
					<CardTitle className="text-base">Last 30 Days</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground text-center py-8">
						Failed to load job statistics
					</p>
				</CardContent>
			</Card>
		);
	}

	const data = [
		{ name: 'Jobs Applied', value: stats.jobsApplied, color: 'hsl(var(--chart-1))' },
		{ name: 'Jobs Listed', value: stats.jobsListed, color: 'hsl(var(--chart-3))' },
		{ name: 'Deadline Ended (Not Applied)', value: stats.deadlineEndedNotApplied, color: 'hsl(var(--destructive))' },
	];

	// Filter out zero values for cleaner visualization
	const filteredData = data.filter(item => item.value > 0);

	if (filteredData.length === 0) {
		return (
			<Card className="h-full">
				<CardHeader className="pb-3">
					<CardTitle className="text-base">Last 30 Days</CardTitle>
					<CardDescription className="text-xs">
						Job activity overview
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground text-center py-8">
						No job activity in the last 30 days
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="pb-3">
				<CardTitle className="text-base">Last 30 Days</CardTitle>
				<CardDescription className="text-xs">
					Job activity overview
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col justify-center pb-4">
				<ResponsiveContainer width="100%" height={250}>
					<PieChart>
						<Pie
							data={filteredData}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={false}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
						>
							{filteredData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: 'hsl(var(--background))',
								border: '1px solid hsl(var(--border))',
								borderRadius: '6px',
							}}
						/>
					</PieChart>
				</ResponsiveContainer>

				{/* Stats Summary */}
				<div className="space-y-2 mt-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-sm bg-[hsl(var(--chart-1))]"></div>
							<span className="text-xs text-muted-foreground">Applied</span>
						</div>
						<span className="text-sm font-semibold">{stats.jobsApplied}</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-sm bg-[hsl(var(--chart-3))]"></div>
							<span className="text-xs text-muted-foreground">Listed</span>
						</div>
						<span className="text-sm font-semibold">{stats.jobsListed}</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-sm bg-destructive"></div>
							<span className="text-xs text-muted-foreground">Missed</span>
						</div>
						<span className="text-sm font-semibold">{stats.deadlineEndedNotApplied}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
