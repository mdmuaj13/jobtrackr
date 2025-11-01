import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
	return (
		<section className="px-4 py-20">
			<div className="max-w-4xl mx-auto">
				<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 p-12 text-center">
					<div className="relative z-10 space-y-6">
						<h2 className="text-3xl sm:text-4xl font-bold text-white">
							Ready to Transform Your Job Search?
						</h2>
						<p className="text-xl text-gray-200 max-w-2xl mx-auto">
							Join thousands of job seekers who are landing their dream jobs
							with JobTrackr
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
							<Button
								asChild
								size="lg"
								className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
								<Link href="/signup" className="flex items-center gap-2">
									Get Started Now
									<ArrowRight className="w-5 h-5" />
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20">
								<Link href="/app/dashboard">View Demo</Link>
							</Button>
						</div>
					</div>
					<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
				</div>
			</div>
		</section>
	);
}
