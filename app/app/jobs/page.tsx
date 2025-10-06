import { JobsList } from '@/components/jobs/jobs-list';

const JobsPage = () => {
	return (
		<div>
			<div className="flex-1 space-y-4 p-8 pt-6">
				<JobsList />
			</div>
		</div>
	);
};

export default JobsPage;
