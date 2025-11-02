import { BarChart3, Calendar, Clock, TrendingUp } from 'lucide-react';

export function DashboardShowcaseSection() {
	return (
		<section className="relative px-4 sm:px-6 py-20 md:py-28 bg-muted/30 overflow-hidden">
			{/* Background Decorations */}
			<div className="absolute top-1/4 -left-20 w-64 h-64 bg-chart-1/30 rounded-full blur-3xl opacity-30"></div>
			<div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-chart-3/30 rounded-full blur-3xl opacity-30"></div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
						Your Command Center for{' '}
						<span className="text-primary">
							Job Success
						</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						A powerful dashboard that puts everything you need at your fingertips
					</p>
				</div>

				{/* Dashboard Mockup */}
				<div className="relative">
					{/* Browser Chrome */}
					<div className="bg-card rounded-t-2xl px-4 py-3 flex items-center gap-2 border-b-2 border-border">
						<div className="flex gap-2">
							<div className="w-3 h-3 rounded-full bg-destructive"></div>
							<div className="w-3 h-3 rounded-full bg-secondary"></div>
							<div className="w-3 h-3 rounded-full bg-primary"></div>
						</div>
						<div className="flex-1 mx-4 bg-muted rounded px-3 py-1 text-xs text-muted-foreground">
							app.jobapplicate.com/dashboard
						</div>
					</div>

					{/* Dashboard Content */}
					<div className="bg-card rounded-b-2xl border-2 border-border shadow-xl overflow-hidden">
						{/* Stats Cards */}
						<div className="p-6 bg-muted/30">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
								<div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-muted-foreground">Total Applied</p>
										<div className="w-8 h-8 rounded-lg bg-chart-1/40 flex items-center justify-center">
											<BarChart3 className="w-4 h-4 text-primary" />
										</div>
									</div>
									<p className="text-2xl font-bold text-card-foreground">48</p>
									<p className="text-xs text-primary flex items-center gap-1 mt-1">
										<TrendingUp className="w-3 h-3" />
										<span>+12% this week</span>
									</p>
								</div>

								<div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-muted-foreground">Interviews</p>
										<div className="w-8 h-8 rounded-lg bg-chart-3/40 flex items-center justify-center">
											<Calendar className="w-4 h-4 text-primary" />
										</div>
									</div>
									<p className="text-2xl font-bold text-card-foreground">12</p>
									<p className="text-xs text-muted-foreground mt-1">3 this week</p>
								</div>

								<div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-muted-foreground">Offers</p>
										<div className="w-8 h-8 rounded-lg bg-chart-1/40 flex items-center justify-center">
											<TrendingUp className="w-4 h-4 text-primary" />
										</div>
									</div>
									<p className="text-2xl font-bold text-card-foreground">3</p>
									<p className="text-xs text-primary mt-1">6.2% conversion</p>
								</div>

								<div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-medium text-muted-foreground">Avg Response</p>
										<div className="w-8 h-8 rounded-lg bg-chart-2/40 flex items-center justify-center">
											<Clock className="w-4 h-4 text-primary" />
										</div>
									</div>
									<p className="text-2xl font-bold text-card-foreground">5.2d</p>
									<p className="text-xs text-muted-foreground mt-1">Getting faster</p>
								</div>
							</div>

							{/* Applications List */}
							<div className="bg-card rounded-xl border-2 border-border overflow-hidden shadow-sm">
								<div className="px-6 py-4 border-b-2 border-border">
									<h3 className="font-semibold text-card-foreground">Recent Applications</h3>
								</div>
								<div className="divide-y divide-border">
									<div className="px-6 py-4 hover:bg-muted/50 transition-colors">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md">
												G
											</div>
											<div className="flex-1">
												<h4 className="font-semibold text-card-foreground">Senior Software Engineer</h4>
												<p className="text-sm text-muted-foreground">Google • Mountain View, CA</p>
											</div>
											<div className="hidden md:flex items-center gap-3">
												<span className="px-3 py-1 bg-chart-1/40 text-primary rounded-full text-xs font-medium">
													Interview Scheduled
												</span>
												<span className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</span>
											</div>
										</div>
									</div>

									<div className="px-6 py-4 hover:bg-muted/50 transition-colors">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 rounded-lg bg-chart-3/60 flex items-center justify-center text-primary font-bold shadow-md">
												M
											</div>
											<div className="flex-1">
												<h4 className="font-semibold text-card-foreground">Product Manager</h4>
												<p className="text-sm text-muted-foreground">Meta • Menlo Park, CA</p>
											</div>
											<div className="hidden md:flex items-center gap-3">
												<span className="px-3 py-1 bg-chart-2/40 text-primary rounded-full text-xs font-medium">
													Application Sent
												</span>
												<span className="text-xs text-muted-foreground">2 days ago</span>
											</div>
										</div>
									</div>

									<div className="px-6 py-4 hover:bg-muted/50 transition-colors">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 rounded-lg bg-destructive flex items-center justify-center text-destructive-foreground font-bold shadow-md">
												A
											</div>
											<div className="flex-1">
												<h4 className="font-semibold text-card-foreground">Senior UX Designer</h4>
												<p className="text-sm text-muted-foreground">Amazon • Seattle, WA</p>
											</div>
											<div className="hidden md:flex items-center gap-3">
												<span className="px-3 py-1 bg-secondary/80 text-secondary-foreground rounded-full text-xs font-medium">
													Resume Review
												</span>
												<span className="text-xs text-muted-foreground">1 week ago</span>
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
					<div className="text-center bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
						<div className="w-12 h-12 rounded-xl bg-chart-1/40 flex items-center justify-center mx-auto mb-4">
							<BarChart3 className="w-6 h-6 text-primary" />
						</div>
						<h3 className="font-semibold text-card-foreground mb-2">Real-time Analytics</h3>
						<p className="text-sm text-muted-foreground">
							Track your progress and optimize your strategy
						</p>
					</div>
					<div className="text-center bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
						<div className="w-12 h-12 rounded-xl bg-chart-3/40 flex items-center justify-center mx-auto mb-4">
							<Calendar className="w-6 h-6 text-primary" />
						</div>
						<h3 className="font-semibold text-card-foreground mb-2">Smart Scheduling</h3>
						<p className="text-sm text-muted-foreground">
							Never miss an interview with automated reminders
						</p>
					</div>
					<div className="text-center bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
						<div className="w-12 h-12 rounded-xl bg-chart-1/40 flex items-center justify-center mx-auto mb-4">
							<TrendingUp className="w-6 h-6 text-primary" />
						</div>
						<h3 className="font-semibold text-card-foreground mb-2">Performance Insights</h3>
						<p className="text-sm text-muted-foreground">
							Understand what's working and what's not
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
