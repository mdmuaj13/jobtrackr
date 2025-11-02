export function DashboardShowcaseSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-12">
					Your entire job search, in one place
				</h2>

				<div className="relative rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
					{/* Dashboard Header */}
					<div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
								<div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
								<div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
							</div>
							<div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
					</div>

					{/* Dashboard Content */}
					<div className="p-8 space-y-6">
						{/* Stats Row */}
						<div className="grid grid-cols-4 gap-4">
							<div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
								<div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
								<div className="h-8 w-16 bg-gray-900 dark:bg-gray-100 rounded"></div>
							</div>
							<div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
								<div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
								<div className="h-8 w-16 bg-gray-900 dark:bg-gray-100 rounded"></div>
							</div>
							<div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
								<div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
								<div className="h-8 w-16 bg-gray-900 dark:bg-gray-100 rounded"></div>
							</div>
							<div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
								<div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
								<div className="h-8 w-16 bg-gray-900 dark:bg-gray-100 rounded"></div>
							</div>
						</div>

						{/* Application List */}
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
							<div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
								<div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700"></div>
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-900 dark:bg-gray-100 rounded w-1/3"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
								</div>
								<div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
							</div>
							<div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
								<div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700"></div>
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-900 dark:bg-gray-100 rounded w-2/5"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
								</div>
								<div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700"></div>
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-900 dark:bg-gray-100 rounded w-1/4"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
								</div>
								<div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
