import {
	Target,
	Brain,
	MessageSquare,
	FileText,
	BarChart3,
	Calendar,
} from 'lucide-react';

interface FeatureCardProps {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

const FeatureCard = ({ title, description, icon: Icon, color }: FeatureCardProps) => (
	<div className="group relative overflow-hidden rounded-xl p-6 bg-card border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
		<div
			className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color} bg-opacity-10`}>
			<Icon className={`w-6 h-6 ${color}`} />
		</div>
		<h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
		<p className="text-sm text-muted-foreground leading-relaxed">
			{description}
		</p>
	</div>
);

export function FeaturesSection() {
	const features = [
		{
			title: 'Application Tracking',
			description:
				'Track every application from submission to offer. Never lose sight of your job search progress.',
			icon: Target,
			color: 'text-gray-700',
		},
		{
			title: 'AI-Powered Insights',
			description:
				'Get intelligent recommendations and insights powered by LLM. Tailored advice based on your profile and job requirements.',
			icon: Brain,
			color: 'text-blue-600',
		},
		{
			title: 'Interview Preparation',
			description:
				'Prepare for interviews with AI-generated questions and tips specific to each role and company.',
			icon: MessageSquare,
			color: 'text-blue-500',
		},
		{
			title: 'Document Management',
			description:
				'Store and organize resumes, cover letters, and other documents. Access them anytime, anywhere.',
			icon: FileText,
			color: 'text-gray-600',
		},
		{
			title: 'Analytics & Reports',
			description:
				'Visualize your job search metrics. Track response rates, interview conversion, and more.',
			icon: BarChart3,
			color: 'text-blue-700',
		},
		{
			title: 'Smart Reminders',
			description:
				'Never miss a deadline or follow-up. Get intelligent reminders for follow-ups and interviews.',
			icon: Calendar,
			color: 'text-gray-700',
		},
	];

	return (
		<section className="px-4 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
			<div className="max-w-6xl mx-auto">
				<div className="text-center space-y-4 mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
						Everything You Need to Succeed
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Powerful features designed to streamline your job search and
						maximize your chances of success
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<FeatureCard key={index} {...feature} />
					))}
				</div>
			</div>
		</section>
	);
}
