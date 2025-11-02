/**
 * Pricing Page
 * Displays all available pricing tiers using the shared PricingSection component
 */

import { PricingSection } from '@/components/home/pricing';

export default function PricingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			<PricingSection />

			{/* FAQ or additional info */}
			<div className="container mx-auto px-4 pb-16">
				<div className="max-w-6xl mx-auto">
					<div className="text-center">
						<p className="text-muted-foreground">
							Need help choosing?{' '}
							<a
								href="mailto:support@jobapplicate.com"
								className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
								Contact our team
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
