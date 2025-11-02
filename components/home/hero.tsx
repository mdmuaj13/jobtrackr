import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-24">
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left Side - Text */}
					<div className="space-y-8">
						<h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
							Stop Losing Applications to Chaos
						</h1>

						<p className="text-xl text-gray-600 dark:text-gray-400">
							Track • Prepare • Land Offers
						</p>

						<div className="space-y-3">
							<Button
								asChild
								size="lg"
								className="text-lg px-10 py-6 w-full sm:w-auto">
								<Link href="/signup">
									Start Free
								</Link>
							</Button>
							<p className="text-sm text-gray-500">No credit card required</p>
						</div>
					</div>

					{/* Right Side - Visual */}
					<div className="relative">
						<div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
							{/* Dashboard Visualization */}
							<div className="p-8 w-full">
								<div className="space-y-4">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
										<div className="flex-1">
											<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
											<div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
										<div className="flex-1">
											<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2"></div>
											<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
										<div className="flex-1">
											<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/5 mb-2"></div>
											<div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-2/5"></div>
										</div>
									</div>
									<div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
										<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
										<div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-4/5"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
