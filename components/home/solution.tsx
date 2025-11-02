import { ArrowRight } from 'lucide-react';

export function SolutionSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* LEFT SIDE - BEFORE */}
					<div className="relative">
						<div className="rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-6 space-y-4">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
								<div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
								<div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
							</div>
							<div className="space-y-3">
								<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
								<div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
								<div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
								<div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
							</div>
						</div>
						<div className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs px-3 py-1 rounded-full">
							Before
						</div>
					</div>

					{/* ARROW */}
					<div className="hidden md:flex justify-center">
						<ArrowRight className="w-12 h-12 text-gray-400" />
					</div>

					{/* RIGHT SIDE - AFTER */}
					<div className="relative">
						<div className="rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-gray-100 p-6 space-y-4">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
								<div className="w-3 h-3 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
								<div className="w-3 h-3 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
							</div>
							<div className="space-y-3">
								<div className="h-8 bg-gray-900 dark:bg-gray-100 rounded"></div>
								<div className="h-4 bg-gray-700 dark:bg-gray-300 rounded w-3/4"></div>
								<div className="h-4 bg-gray-700 dark:bg-gray-300 rounded w-1/2"></div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="h-12 bg-gray-900 dark:bg-gray-100 rounded"></div>
								<div className="h-12 bg-gray-900 dark:bg-gray-100 rounded"></div>
							</div>
						</div>
						<div className="absolute -top-2 -right-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1 rounded-full">
							After
						</div>
					</div>
				</div>

				{/* Key Metrics */}
				<div className="mt-12 grid grid-cols-3 gap-8 text-center">
					<div>
						<p className="text-3xl font-bold text-gray-900 dark:text-white">
							3.2x
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							more callbacks
						</p>
					</div>
					<div>
						<p className="text-3xl font-bold text-gray-900 dark:text-white">
							87%
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							more confident
						</p>
					</div>
					<div>
						<p className="text-3xl font-bold text-gray-900 dark:text-white">
							8+ hrs
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							saved/month
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
