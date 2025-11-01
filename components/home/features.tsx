import {
	LayoutDashboard,
	Calendar,
	FileText,
	MessageSquare,
	Pencil,
	Target,
	Users,
	BarChart3,
} from 'lucide-react';

export function FeaturesSection() {
	return (
		<section className="px-4 sm:px-6 py-20 md:py-32 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Everything You Need to{' '}
						<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
							Win the Job Hunt
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Powerful tools designed to keep you organized, prepared, and confident.
					</p>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{/* Dashboard - Large Feature */}
					<div className="group relative md:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
						<div className="relative z-10">
							<div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
								<LayoutDashboard className="w-7 h-7 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-white mb-3">Unified Dashboard</h3>
							<p className="text-blue-50 mb-6">
								Track all your applications in one beautiful, organized view. See your progress at a glance.
							</p>
							<div className="space-y-2">
								<div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
									<div className="w-8 h-8 rounded bg-white/30"></div>
									<div className="flex-1">
										<div className="h-2 bg-white/40 rounded w-3/4"></div>
									</div>
								</div>
								<div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
									<div className="w-8 h-8 rounded bg-white/30"></div>
									<div className="flex-1">
										<div className="h-2 bg-white/40 rounded w-2/3"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Calendar */}
					<div className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
								<Calendar className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Smart Calendar</h3>
							<p className="text-sm text-purple-50">
								Never miss an interview with automated reminders
							</p>
						</div>
					</div>

					{/* Notes */}
					<div className="group relative bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
								<FileText className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Rich Notes</h3>
							<p className="text-sm text-amber-50">
								Keep everything organized in one place
							</p>
						</div>
					</div>

					{/* AI Chat - Medium Feature */}
					<div className="group relative md:col-span-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="relative z-10">
							<div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
								<MessageSquare className="w-7 h-7 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-white mb-3">AI Career Assistant</h3>
							<p className="text-cyan-50 mb-4">
								Get instant answers, career advice, and personalized guidance powered by AI.
							</p>
							<div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
								<p className="text-sm text-white/90 italic">"How should I prepare for my Google interview?"</p>
							</div>
						</div>
					</div>

					{/* Cover Letters */}
					<div className="group relative bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl p-6 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
								<Pencil className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-2">AI Cover Letters</h3>
							<p className="text-sm text-emerald-50">
								Generate customized letters in minutes
							</p>
						</div>
					</div>

					{/* Interview Prep */}
					<div className="group relative bg-gradient-to-br from-rose-400 to-red-600 rounded-3xl p-6 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
								<Target className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Interview Prep</h3>
							<p className="text-sm text-rose-50">
								Practice questions tailored to your role
							</p>
						</div>
					</div>

					{/* Mock Interview */}
					<div className="group relative bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
								<Users className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Mock Interviews</h3>
							<p className="text-sm text-violet-50">
								Build confidence before the real thing
							</p>
						</div>
					</div>

					{/* Analytics */}
					<div className="group relative bg-gradient-to-br from-teal-400 to-cyan-600 rounded-3xl p-6 overflow-hidden transition-transform hover:scale-[1.02]">
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
								<BarChart3 className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Smart Analytics</h3>
							<p className="text-sm text-teal-50">
								Understand what's working
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
