import {
	LayoutDashboard,
	Calendar,
	FileText,
	MessageSquare,
	Pencil,
	Target,
	Users,
	BarChart3,
} from 'lucide-react';

interface FeatureCardProps {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => (
	<div className="group relative overflow-hidden rounded-xl p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
		<div className="flex flex-col items-center text-center space-y-4">
			<div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
				<Icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
			</div>
			<div className="space-y-2">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					{description}
				</p>
			</div>
		</div>
	</div>
);

export function FeaturesSection() {
	const features = [
		{
			title: 'Dashboard',
			description: 'See all applications at a glance',
			icon: LayoutDashboard,
		},
		{
			title: 'Calendar',
			description: 'Never miss an interview',
			icon: Calendar,
		},
		{
			title: 'Notes',
			description: 'Everything stored in one place',
			icon: FileText,
		},
		{
			title: 'AI Chat',
			description: 'Ask questions. Get guidance.',
			icon: MessageSquare,
		},
		{
			title: 'Cover Letters',
			description: 'Customized in 2 minutes',
			icon: Pencil,
		},
		{
			title: 'Interview Prep',
			description: 'Know what\'s coming',
			icon: Target,
		},
		{
			title: 'Mock Interview',
			description: 'Practice before the real thing',
			icon: Users,
		},
		{
			title: 'Analytics',
			description: 'See what\'s working',
			icon: BarChart3,
		},
	];

	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, index) => (
						<FeatureCard key={index} {...feature} />
					))}
				</div>
			</div>
		</section>
	);
}
