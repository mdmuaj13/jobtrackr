import { Link2, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export function HowItWorksSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-background">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						How JobApplicate Works
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Three simple steps to transform your job search
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 items-center">
					{/* STEP 1 */}
					<div className="text-center space-y-4 bg-card rounded-2xl p-6 border-2 border-border shadow-sm hover:shadow-md transition-shadow">
						<div className="flex justify-center">
							<div className="w-20 h-20 rounded-2xl bg-chart-1/30 flex items-center justify-center">
								<Link2 className="w-10 h-10 text-primary" />
							</div>
						</div>
						<h3 className="text-xl font-bold text-card-foreground">
							Add Jobs
						</h3>
						<p className="text-muted-foreground">
							Paste job links → We extract all details automatically
						</p>
					</div>

					{/* Arrow */}
					<div className="hidden md:flex justify-center">
						<ArrowRight className="w-8 h-8 text-muted-foreground" />
					</div>

					{/* STEP 2 */}
					<div className="text-center space-y-4 bg-card rounded-2xl p-6 border-2 border-border shadow-sm hover:shadow-md transition-shadow">
						<div className="flex justify-center">
							<div className="w-20 h-20 rounded-2xl bg-chart-2/30 flex items-center justify-center">
								<Calendar className="w-10 h-10 text-primary" />
							</div>
						</div>
						<h3 className="text-xl font-bold text-card-foreground">
							Track Progress
						</h3>
						<p className="text-muted-foreground">
							Track status → Set reminders → Prepare for interviews
						</p>
					</div>

					{/* Arrow */}
					<div className="hidden md:flex justify-center">
						<ArrowRight className="w-8 h-8 text-muted-foreground" />
					</div>

					{/* STEP 3 */}
					<div className="text-center space-y-4 bg-card rounded-2xl p-6 border-2 border-border shadow-sm hover:shadow-md transition-shadow">
						<div className="flex justify-center">
							<div className="w-20 h-20 rounded-2xl bg-chart-3/30 flex items-center justify-center">
								<Sparkles className="w-10 h-10 text-primary" />
							</div>
						</div>
						<h3 className="text-xl font-bold text-card-foreground">
							AI Prepares You
						</h3>
						<p className="text-muted-foreground">
							Custom cover letters → Mock interviews → Success guaranteed
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
