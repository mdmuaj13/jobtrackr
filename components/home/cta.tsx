import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-primary">
			<div className="max-w-4xl mx-auto text-center space-y-8">
				<h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
					Get organized. Prepare smarter. Land offers faster.
				</h2>

				<Button
					asChild
					size="lg"
					className="text-lg px-12 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg">
					<Link href="/signup">Start Tracking Free</Link>
				</Button>

				<p className="text-sm text-primary-foreground/80">
					No credit card required. Cancel anytime.
				</p>
			</div>
		</section>
	);
}
