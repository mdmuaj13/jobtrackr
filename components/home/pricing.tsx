import { Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllPricingTiers } from '@/lib/pricing-config';
import { PricingTierConfig } from '@/types/subscription';

interface PricingCardProps {
	tier: PricingTierConfig;
}

const PricingCard = ({ tier }: PricingCardProps) => {
	const formatFeatureValue = (value: number | string | boolean) => {
		if (value === 'unlimited') return 'Unlimited';
		if (typeof value === 'boolean') return value ? 'Yes' : 'No';
		if (typeof value === 'number') return value.toLocaleString();
		return value;
	};

	const isComingSoon = tier.tier === 'pro';
	const isCustom = tier.tier === 'custom';

	return (
		<Card
			className={`relative ${
				tier.highlighted
					? 'border-blue-500 shadow-xl scale-105 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900'
					: 'border-border bg-card'
			}`}>
			{tier.highlighted && (
				<div className="absolute -top-4 left-1/2 -translate-x-1/2">
					<Badge className="bg-blue-600 text-white px-4 py-1 border-0">
						<Sparkles className="h-3 w-3 mr-1 inline" />
						Most Popular
					</Badge>
				</div>
			)}

			{isComingSoon && (
				<div className="absolute -top-4 right-4">
					<Badge variant="secondary" className="px-3 py-1">
						Coming Soon
					</Badge>
				</div>
			)}

			<CardHeader>
				<CardTitle className="text-2xl">{tier.name}</CardTitle>
				<CardDescription className="text-base">
					{tier.description}
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Price */}
				<div className="mb-6">
					{tier.price === 0 && !isCustom ? (
						<div className="text-4xl font-bold">Free</div>
					) : isCustom ? (
						<div className="text-4xl font-bold">Custom</div>
					) : (
						<div>
							<span className="text-4xl font-bold">${tier.price}</span>
							<span className="text-muted-foreground">
								/{tier.billingPeriod === 'monthly' ? 'mo' : 'yr'}
							</span>
						</div>
					)}
				</div>

				{/* Features */}
				<div className="space-y-3">
					{/* Jobs */}
					<div className="flex items-start gap-2">
						<Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
						<span className="text-sm">
							<strong>{formatFeatureValue(tier.features.jobsPerMonth)}</strong>{' '}
							jobs per month
						</span>
					</div>

					{/* Chat */}
					{tier.features.chatAccess ? (
						<div className="flex items-start gap-2">
							<Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
							<span className="text-sm">
								AI Chat (
								{formatFeatureValue(tier.features.chatMessagesPerMonth)}{' '}
								messages/month)
							</span>
						</div>
					) : (
						<div className="flex items-start gap-2 opacity-50">
							<span className="h-5 w-5 flex-shrink-0">✕</span>
							<span className="text-sm line-through">AI Chat access</span>
						</div>
					)}

					{/* Calendar */}
					{tier.features.calendarAccess && (
						<div className="flex items-start gap-2">
							<Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
							<span className="text-sm">Calendar & Events</span>
						</div>
					)}

					{/* Export */}
					{tier.features.exportData ? (
						<div className="flex items-start gap-2">
							<Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
							<span className="text-sm">Export data</span>
						</div>
					) : (
						<div className="flex items-start gap-2 opacity-50">
							<span className="h-5 w-5 flex-shrink-0">✕</span>
							<span className="text-sm line-through">Export data</span>
						</div>
					)}

					{/* Support */}
					<div className="flex items-start gap-2">
						<Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
						<span className="text-sm">
							{tier.features.prioritySupport
								? 'Priority support'
								: 'Email support'}
						</span>
					</div>

					{/* Custom features */}
					{tier.features.customFeatures?.map((feature, index) => (
						<div key={index} className="flex items-start gap-2">
							<Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
							<span className="text-sm">{feature}</span>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter>
				<Button
					asChild={!isComingSoon}
					className="w-full"
					variant={tier.highlighted ? 'default' : 'outline'}
					disabled={isComingSoon}>
					{isComingSoon ? (
						<span>Coming Soon</span>
					) : isCustom ? (
						<Link href="mailto:support@jobtrackr.com?subject=Custom Plan Inquiry">
							Contact Sales
						</Link>
					) : (
						<Link href="/signup">Get Started</Link>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
};

export function PricingSection() {
	const pricingTiers = getAllPricingTiers();

	return (
		<section className="px-4 py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
			<div className="max-w-6xl mx-auto">
				<div className="text-center space-y-4 mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
						<Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
						<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
							Simple, Transparent Pricing
						</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
						Choose the Perfect Plan for You
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Start free and upgrade as you grow. All plans include core features
						to help you succeed.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{pricingTiers.map((tier) => (
						<PricingCard key={tier.tier} tier={tier} />
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-muted-foreground">
						All plans include 14-day free trial • No credit card required •{' '}
						<Link
							href="/pricing"
							className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
							View detailed comparison
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
