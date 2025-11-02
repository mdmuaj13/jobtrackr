import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
	return (
		<section className="px-4 py-20 bg-gray-900 dark:bg-gray-950">
			<div className="max-w-4xl mx-auto text-center space-y-8">
				<h2 className="text-3xl md:text-4xl font-bold text-white">
					Get organized. Prepare smarter. Land offers faster.
				</h2>

				<Button
					asChild
					size="lg"
					className="text-lg px-12 py-6 bg-white text-gray-900 hover:bg-gray-100">
					<Link href="/signup">Start Tracking Free</Link>
				</Button>

				<p className="text-sm text-gray-400">
					No credit card required. Cancel anytime.
				</p>
			</div>
		</section>
	);
}
