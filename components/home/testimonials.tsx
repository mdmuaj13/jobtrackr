import { User } from 'lucide-react';

interface TestimonialProps {
	quote: string;
	name: string;
	title: string;
	timeline: string;
	metric: string;
}

const TestimonialCard = ({
	quote,
	name,
	title,
	timeline,
	metric,
}: TestimonialProps) => (
	<div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
		<div className="flex justify-center">
			<div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
				<User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
			</div>
		</div>

		<p className="text-gray-900 dark:text-white text-center font-medium">
			&quot;{quote}&quot;
		</p>

		<div className="text-center">
			<p className="text-sm text-gray-900 dark:text-white font-semibold">
				{name}
			</p>
			<p className="text-xs text-gray-600 dark:text-gray-400">
				{title} | {timeline}
			</p>
		</div>

		<div className="text-center">
			<p className="text-2xl font-bold text-gray-900 dark:text-white">
				{metric}
			</p>
		</div>
	</div>
);

export function TestimonialsSection() {
	const testimonials = [
		{
			quote: 'Response rate went from 5% to 40%',
			name: 'Sarah Chen',
			title: 'Software Engineer',
			timeline: '8 weeks',
			metric: '5% → 40%',
		},
		{
			quote: 'Landed my dream job in half the time',
			name: 'Michael Rodriguez',
			title: 'Product Manager',
			timeline: '6 weeks',
			metric: '3x faster',
		},
		{
			quote: 'AI prep made interviews so much easier',
			name: 'Emily Watson',
			title: 'Data Analyst',
			timeline: '4 weeks',
			metric: '87% confident',
		},
		{
			quote: 'Saved hours every week organizing',
			name: 'David Kim',
			title: 'UX Designer',
			timeline: '10 weeks',
			metric: '8+ hrs saved',
		},
	];

	return (
		<section className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard key={index} {...testimonial} />
					))}
				</div>
			</div>
		</section>
	);
}
