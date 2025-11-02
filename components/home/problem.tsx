import { Layers, Clock, TrendingDown } from 'lucide-react';

export function ProblemSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-3 gap-12">
					{/* Column 1 - CHAOS */}
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
								<Layers className="w-8 h-8 text-gray-700 dark:text-gray-400" />
							</div>
						</div>
						<p className="text-gray-600 dark:text-gray-400">
							Applications scattered across 5 websites
						</p>
					</div>

					{/* Column 2 - LOST TIME */}
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
								<Clock className="w-8 h-8 text-gray-700 dark:text-gray-400" />
							</div>
						</div>
						<p className="text-gray-600 dark:text-gray-400">
							45 minutes per cover letter
						</p>
					</div>

					{/* Column 3 - LOW RESULTS */}
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
								<TrendingDown className="w-8 h-8 text-gray-700 dark:text-gray-400" />
							</div>
						</div>
						<p className="text-gray-600 dark:text-gray-400">5% response rate</p>
					</div>
				</div>
			</div>
		</section>
	);
}
