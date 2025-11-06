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
		className={`relative rounded-2xl p-8 border-2 ${
			highlighted
				? 'border-primary bg-secondary/20 shadow-lg shadow-primary/20 scale-105'
				: 'border-border bg-card shadow-sm'
		}`}>
		{badge && (
			<div className="absolute -top-3 left-1/2 -translate-x-1/2">
				<span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-medium">
					{badge}
				</span>
			</div>
		)}

		<div className="space-y-6">
			<div>
				<h3 className="text-2xl font-bold text-card-foreground">
					{title}
				</h3>
				<p className="text-4xl font-bold text-card-foreground mt-4">
					{price}
				</p>
			</div>

			<div className="space-y-3">
				{features.map((feature, index) => (
					<div key={index} className="flex items-start gap-2">
						<Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
						<span className="text-sm text-muted-foreground">
							{feature}
						</span>
					</div>
				))}
			</div>

			<Button
				asChild={!disabled}
				className={`w-full ${highlighted ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-2 hover:border-primary'}`}
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
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						Simple, Transparent Pricing
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Choose the plan that works best for your job search journey
					</p>
				</div>
				
				<div className="grid md:grid-cols-3 gap-8">
					{/* FREE */}
					<PricingCard
						title="FREE"
						price="$0"
						features={[
							'100 jobs per month',
							'20 AI chat messages per month',
							'Manual job entry',
							'Simple notes per job',
							'Calendar access',
							'Company management',
							'Basic dashboard',
						]}
						buttonText="Start Free"
					/>

					{/* PRO */}
					<PricingCard
						title="PRO"
						price="$10/mo"
						features={[
							'Unlimited jobs',
							'1000 AI chat messages per month',
							'AI-powered job entry',
							'Detailed notes & follow-ups',
							'Analytics dashboard',
							'Application timeline',
							'Email notifications',
							'Data export',
							'Priority support',
						]}
						buttonText="Get Started"
						buttonHref="/signup"
						highlighted={true}
						badge="Most Popular"
					/>

					{/* CUSTOM */}
					<PricingCard
						title="CUSTOM"
						price="Contact Sales"
						features={[
							'Everything in Pro',
							'Unlimited AI chat messages',
							'Custom integrations',
							'Dedicated support',
							'Custom branding',
							'API access',
							'Priority setup',
							'1-on-1 strategy calls',
						]}
						buttonText="Contact Sales"
						buttonHref="mailto:support@jobapplicate.com"
					/>
				</div>
			</div>
		</section>
	);
}
