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
	<div className="bg-card rounded-2xl p-6 border-2 border-border shadow-sm space-y-4 hover:shadow-md transition-shadow">
		<div className="flex justify-center">
			<div className="w-16 h-16 rounded-full bg-chart-1/40 flex items-center justify-center border-2 border-border">
				<User className="w-8 h-8 text-primary" />
			</div>
		</div>

		<p className="text-card-foreground text-center font-medium italic">
			&quot;{quote}&quot;
		</p>

		<div className="text-center">
			<p className="text-sm text-card-foreground font-semibold">
				{name}
			</p>
			<p className="text-xs text-muted-foreground">
				{title} | {timeline}
			</p>
		</div>

		<div className="text-center">
			<p className="text-2xl font-bold text-primary">
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
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						Trusted by Successful Job Seekers
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Millions of professionals have transformed their job search with JobApplicate
					</p>
				</div>
				
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard key={index} {...testimonial} />
					))}
				</div>
			</div>
		</section>
	);
}
