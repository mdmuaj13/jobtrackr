import { Link2, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export function HowItWorksSection() {
	return (
		<section className="px-4 py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-3 gap-12 items-center">
					{/* STEP 1 */}
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
								<Link2 className="w-10 h-10 text-gray-700 dark:text-gray-300" />
							</div>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Add Job Link
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Paste → We extract details
						</p>
					</div>

					{/* Arrow */}
					<div className="hidden md:flex justify-center">
						<ArrowRight className="w-8 h-8 text-gray-300 dark:text-gray-700" />
					</div>

					{/* STEP 2 */}
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
								<Calendar className="w-10 h-10 text-gray-700 dark:text-gray-300" />
							</div>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Track Progress
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Status updates → Interview preps
						</p>
					</div>

					{/* Arrow */}
					<div className="hidden md:flex justify-center">
						<ArrowRight className="w-8 h-8 text-gray-300 dark:text-gray-700" />
					</div>

					{/* STEP 3 */}
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
								<Sparkles className="w-10 h-10 text-gray-700 dark:text-gray-300" />
							</div>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							AI Prepares You
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Cover letters → Mock interviews
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
