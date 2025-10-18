'use client';

import { useParams } from 'next/navigation';
import { useJob } from '@/hooks/jobs';
import { JobDetailsPageView } from '@/components/jobs/job-details-page-view';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

export default function JobDetailsPage() {
	const params = useParams();
	const jobId = params.id as string;

	const { data: jobResponse, error, mutate } = useJob(jobId);

	const handleSuccess = () => {
		// Refresh the job data
		mutate();
	};

	if (error) {
		return (
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-center h-[calc(100vh-200px)]">
					<p className="text-red-500">Failed to load job details</p>
				</div>
			</div>
		);
	}

	if (!jobResponse?.data) {
		return (
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-center h-[calc(100vh-200px)]">
					<Spinner variant="pinwheel" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 space-y-4 p-8 pt-6 h-[calc(100vh-80px)]">
			<JobDetailsPageView job={jobResponse.data} onSuccess={handleSuccess} />
		</div>
	);
}
