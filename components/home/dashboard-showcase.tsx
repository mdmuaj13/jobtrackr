import { BarChart3, Calendar, Clock, TrendingUp } from 'lucide-react';

export function DashboardShowcaseSection() {
	return (
		<section className="relative px-4 sm:px-6 py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
			{/* Background Decorations */}
			<div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-20"></div>
			<div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-20"></div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Your Command Center for{' '}
						<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
							Job Success
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						A powerful dashboard that puts everything you need at your fingertips
					</p>
				</div>

				{/* Dashboard Mockup */}
				<div className="relative">
					{/* Browser Chrome */}
					<div className="bg-gray-200 dark:bg-gray-800 rounded-t-2xl px-4 py-3 flex items-center gap-2">
						<div className="flex gap-2">
							<div className="w-3 h-3 rounded-full bg-red-500"></div>
							<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
							<div className="w-3 h-3 rounded-full bg-green-500"></div>
						</div>
						<div className="flex-1 mx-4 bg-gray-100 dark:bg-gray-700 rounded px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
							app.jobtrackr.com/dashboard
						</div>
					</div>

					{/* Dashboard Content */}
					<div className="bg-white dark:bg-gray-900 rounded-b-2xl border-x border-b border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
						{/* Stats Cards */}
						<div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Applied</p>
										<div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
											<BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
										</div>
									</div>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">48</p>
									<p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
										<TrendingUp className="w-3 h-3" />
										<span>+12% this week</span>
									</p>
								</div>

								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400">Interviews</p>
										<div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
											<Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
										</div>
									</div>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
									<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">3 this week</p>
								</div>

								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400">Offers</p>
										<div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
											<TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
										</div>
									</div>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
									<p className="text-xs text-green-600 dark:text-green-400 mt-1">6.2% conversion</p>
								</div>

								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Response</p>
										<div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
											<Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
										</div>
									</div>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">5.2d</p>
									<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Getting faster</p>
								</div>
							</div>

							{/* Applications List */}
							<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
								<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
									<h3 className="font-semibold text-gray-900 dark:text-white">Recent Applications</h3>
								</div>
								<div className="divide-y divide-gray-200 dark:divide-gray-700">
									<div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
												G
											</div>
											<div className="flex-1">
												<h4 className="font-semibold text-gray-900 dark:text-white">Senior Software Engineer</h4>
												<p className="text-sm text-gray-500 dark:text-gray-400">Google • Mountain View, CA</p>
											</div>
											<div className="hidden md:flex items-center gap-3">
												<span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
													Interview Scheduled
												</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">Tomorrow, 2:00 PM</span>
											</div>
										</div>
									</div>

									<div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
												M
											</div>
											<div className="flex-1">
												<h4 className="font-semibold text-gray-900 dark:text-white">Product Manager</h4>
												<p className="text-sm text-gray-500 dark:text-gray-400">Meta • Menlo Park, CA</p>
											</div>
											<div className="hidden md:flex items-center gap-3">
												<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
													Application Sent
												</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
											</div>
										</div>
									</div>

									<div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg">
												A
											</div>
											<div className="flex-1">
												<h4 className="font-semibold text-gray-900 dark:text-white">Senior UX Designer</h4>
												<p className="text-sm text-gray-500 dark:text-gray-400">Amazon • Seattle, WA</p>
											</div>
											<div className="hidden md:flex items-center gap-3">
												<span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-medium">
													Resume Review
												</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">1 week ago</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Feature Highlights */}
				<div className="grid md:grid-cols-3 gap-6 mt-12">
					<div className="text-center">
						<div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
							<BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
						</div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Analytics</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Track your progress and optimize your strategy
						</p>
					</div>
					<div className="text-center">
						<div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
							<Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
						</div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Scheduling</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Never miss an interview with automated reminders
						</p>
					</div>
					<div className="text-center">
						<div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
							<TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
						</div>
						<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Insights</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Understand what's working and what's not
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
