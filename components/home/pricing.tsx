import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PricingCardProps {
	title: string;
	price: string;
	features: string[];
	buttonText: string;
	buttonHref?: string;
	highlighted?: boolean;
	badge?: string;
	disabled?: boolean;
}

const PricingCard = ({
	title,
	price,
	features,
	buttonText,
	buttonHref = '/signup',
	highlighted = false,
	badge,
	disabled = false,
}: PricingCardProps) => (
	<div
		className={`relative rounded-xl p-8 border ${
			highlighted
				? 'border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-800 shadow-xl scale-105'
				: 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
		}`}>
		{badge && (
			<div className="absolute -top-3 left-1/2 -translate-x-1/2">
				<span className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1 rounded-full">
					{badge}
				</span>
			</div>
		)}

		<div className="space-y-6">
			<div>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
					{title}
				</h3>
				<p className="text-4xl font-bold text-gray-900 dark:text-white mt-4">
					{price}
				</p>
			</div>

			<div className="space-y-3">
				{features.map((feature, index) => (
					<div key={index} className="flex items-start gap-2">
						<Check className="w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0 mt-0.5" />
						<span className="text-sm text-gray-600 dark:text-gray-400">
							{feature}
						</span>
					</div>
				))}
			</div>

			<Button
				asChild={!disabled}
				className="w-full"
				variant={highlighted ? 'default' : 'outline'}
				disabled={disabled}>
				{disabled ? (
					<span>{buttonText}</span>
				) : (
					<Link href={buttonHref}>{buttonText}</Link>
				)}
			</Button>
		</div>
	</div>
);

export function PricingSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-3 gap-8">
					{/* FREE */}
					<PricingCard
						title="FREE"
						price="$0"
						features={[
							'Track apps',
							'Calendar',
							'Notes',
							'Basic insights',
						]}
						buttonText="Start Free"
					/>

					{/* PRO */}
					<PricingCard
						title="PRO"
						price="Coming Soon"
						features={[
							'Everything in Free',
							'AI Cover Letters',
							'Interview Prep',
							'Mock Interviews',
							'AI Chat',
							'Advanced Analytics',
						]}
						buttonText="Join Waitlist"
						highlighted={true}
						badge="Most Popular"
						disabled={true}
					/>

					{/* CUSTOM */}
					<PricingCard
						title="CUSTOM"
						price="Contact Sales"
						features={[
							'Everything in Pro',
							'Dedicated Support',
							'Priority Setup',
							'1-on-1 Strategy Calls',
						]}
						buttonText="Contact Sales"
						buttonHref="mailto:support@jobtrackr.com"
					/>
				</div>
			</div>
		</section>
	);
}
