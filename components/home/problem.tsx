import { Layers, Clock, TrendingDown } from 'lucide-react';

export function ProblemSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						The Job Search Struggle is Real
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Millions of job seekers face the same overwhelming challenges
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					{/* Column 1 - CHAOS */}
					<div className="bg-card rounded-2xl p-8 shadow-sm border-2 border-border text-center space-y-4 hover:shadow-md transition-shadow">
						<div className="flex justify-center">
							<div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
								<Layers className="w-8 h-8 text-destructive" />
							</div>
						</div>
						<h3 className="text-xl font-bold text-card-foreground">Chaotic Organization</h3>
						<p className="text-muted-foreground">
							Applications scattered across multiple platforms
						</p>
					</div>

					{/* Column 2 - LOST TIME */}
					<div className="bg-card rounded-2xl p-8 shadow-sm border-2 border-border text-center space-y-4 hover:shadow-md transition-shadow">
						<div className="flex justify-center">
							<div className="w-16 h-16 rounded-full bg-accent/40 flex items-center justify-center">
								<Clock className="w-8 h-8 text-accent-foreground" />
							</div>
						</div>
						<h3 className="text-xl font-bold text-card-foreground">Time Drains</h3>
						<p className="text-muted-foreground">
							Hours spent on repetitive tasks per application
						</p>
					</div>

					{/* Column 3 - LOW RESULTS */}
					<div className="bg-card rounded-2xl p-8 shadow-sm border-2 border-border text-center space-y-4 hover:shadow-md transition-shadow">
						<div className="flex justify-center">
							<div className="w-16 h-16 rounded-full bg-chart-2/40 flex items-center justify-center">
								<TrendingDown className="w-8 h-8 text-primary" />
							</div>
						</div>
						<h3 className="text-xl font-bold text-card-foreground">Poor Results</h3>
						<p className="text-muted-foreground">Low response rates due to poor tracking</p>
					</div>
				</div>
			</div>
		</section>
	);
}
