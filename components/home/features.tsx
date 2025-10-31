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
		<section className="px-4 sm:px-6 py-20 md:py-32 bg-primary">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
						Everything You Need to{' '}
						<span className="text-secondary">Win the Job Hunt</span>
					</h2>
					<p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
						Powerful tools designed to keep you organized, prepared, and
						confident.
					</p>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* Dashboard - Large Feature */}
					<div className="group relative md:col-span-2 lg:col-span-2 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
								<LayoutDashboard className="w-6 h-6 text-secondary-foreground" />
							</div>
							<h3 className="text-xl font-bold text-primary-foreground mb-2">
								Unified Dashboard
							</h3>
							<p className="text-primary-foreground/80 mb-4">
								Track all your applications in one beautiful, organized view.
								See your progress at a glance.
							</p>
							<div className="space-y-2">
								<div className="bg-primary-foreground/10 rounded-lg p-2 flex items-center gap-2">
									<div className="w-6 h-6 rounded bg-secondary"></div>
									<div className="flex-1">
										<div className="h-1.5 bg-primary-foreground/30 rounded w-3/4"></div>
									</div>
								</div>
								<div className="bg-primary-foreground/10 rounded-lg p-2 flex items-center gap-2">
									<div className="w-6 h-6 rounded bg-secondary/70"></div>
									<div className="flex-1">
										<div className="h-1.5 bg-primary-foreground/30 rounded w-2/3"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Cover Letters */}
					<div className="group relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-10 h-10 rounded-lg bg-chart-1 flex items-center justify-center mb-4">
								<Pencil className="w-5 h-5 text-secondary-foreground" />
							</div>
							<h3 className="text-lg font-bold text-primary-foreground mb-2">
								Cover Letters
							</h3>
							<p className="text-sm text-primary-foreground/80">
								Generate customized letters in minutes
							</p>
						</div>
					</div>

					{/* Notes */}
					<div className="group relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
								<FileText className="w-5 h-5 text-secondary-foreground" />
							</div>
							<h3 className="text-lg font-bold text-primary-foreground mb-2">
								Rich Notes
							</h3>
							<p className="text-sm text-primary-foreground/80">
								Keep everything organized in one place
							</p>
						</div>
					</div>

					{/* AI Chat - Medium Feature */}
					<div className="group relative md:col-span-2 lg:col-span-2 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center mb-4">
								<MessageSquare className="w-5 h-5 text-secondary-foreground" />
							</div>
							<h3 className="text-xl font-bold text-primary-foreground mb-2">
								AI Career Assistant
							</h3>
							<p className="text-primary-foreground/80 mb-3">
								Get instant answers, career advice, and personalized guidance
								powered by AI.
							</p>
							<div className="bg-primary-foreground/10 rounded-lg p-3 border-2 border-primary-foreground/20">
								<p className="text-sm text-primary-foreground italic">
									{`"How should I prepare for my Google interview?"`}
								</p>
							</div>
						</div>
					</div>

					{/* Interview Prep */}
					<div className="group relative md:col-span-2 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-10 h-10 rounded-lg bg-destructive flex items-center justify-center mb-4">
								<Target className="w-5 h-5 text-destructive-foreground" />
							</div>
							<h3 className="text-lg font-bold text-primary-foreground mb-2">
								Interview Prep
							</h3>
							<p className="text-sm text-primary-foreground/80">
								Practice questions tailored to your role
							</p>
						</div>
					</div>

					{/* Analytics */}
					<div className="group relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center mb-4">
								<BarChart3 className="w-5 h-5 text-secondary-foreground" />
							</div>
							<h3 className="text-lg font-bold text-primary-foreground mb-2">
								Smart Analytics
							</h3>
							<p className="text-sm text-primary-foreground/80">
								Understand what&apos;s working
							</p>
						</div>
					</div>

					{/* Mock Interview */}
					<div className="group relative md:col-span-2 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-10 h-10 rounded-lg bg-chart-3 flex items-center justify-center mb-4">
								<Users className="w-5 h-5 text-secondary-foreground" />
							</div>
							<h3 className="text-lg font-bold text-primary-foreground mb-2">
								Mock Interviews
							</h3>
							<p className="text-sm text-primary-foreground/80">
								Build confidence before the real thing
							</p>
						</div>
					</div>
					{/* Calendar */}
					<div className="group relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/20 transition-all hover:bg-primary-foreground/15 hover:shadow-lg">
						<div className="relative z-10">
							<div className="w-10 h-10 rounded-lg bg-chart-3/80 flex items-center justify-center mb-4">
								<Calendar className="w-5 h-5 text-secondary-foreground" />
							</div>
							<h3 className="text-lg font-bold text-primary-foreground mb-2">
								Smart Calendar
							</h3>
							<p className="text-sm text-primary-foreground/80">
								Never miss an interview with automated reminders
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
