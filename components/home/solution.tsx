import { ArrowRight } from 'lucide-react';

export function SolutionSection() {
	return (
		<section className="px-4 sm:px-6 py-16 md:py-20 bg-background">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						The Solution: AI-Powered Organization
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						JobTrackr transforms chaotic job searching into a streamlined, confident experience
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* LEFT SIDE - BEFORE */}
					<div className="relative">
						<div className="rounded-2xl bg-card border-2 border-border p-6 shadow-sm space-y-4">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
								<div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
								<div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
							</div>
							<div className="space-y-3">
								<div className="h-8 bg-muted rounded"></div>
								<div className="h-4 bg-muted/50 rounded w-3/4"></div>
								<div className="h-4 bg-muted/50 rounded w-1/2"></div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="h-12 bg-muted rounded"></div>
								<div className="h-12 bg-muted rounded"></div>
							</div>
						</div>
						<div className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-medium">
							Before
						</div>
					</div>

					{/* ARROW */}
					<div className="hidden md:flex justify-center">
						<ArrowRight className="w-12 h-12 text-primary" />
					</div>

					{/* RIGHT SIDE - AFTER */}
					<div className="relative">
						<div className="rounded-2xl bg-primary p-7 shadow-lg">
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
									<div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
									<div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
								</div>
								<div className="space-y-3">
									<div className="h-8 bg-primary-foreground/20 backdrop-blur-sm rounded"></div>
									<div className="h-4 bg-primary-foreground/10 backdrop-blur-sm rounded w-3/4"></div>
									<div className="h-4 bg-primary-foreground/10 backdrop-blur-sm rounded w-1/2"></div>
								</div>
								<div className="grid grid-cols-2 gap-3">
									<div className="h-12 bg-primary-foreground/20 backdrop-blur-sm rounded"></div>
									<div className="h-12 bg-primary-foreground/20 backdrop-blur-sm rounded"></div>
								</div>
							</div>
						</div>
						<div className="absolute -top-3 -right-3 bg-chart-1 text-primary text-xs px-3 py-1 rounded-full font-medium">
							After
						</div>
					</div>
				</div>

				{/* Key Metrics */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div className="bg-card rounded-2xl p-6 border-2 border-border">
						<p className="text-4xl font-bold text-primary">
							3.2x
						</p>
						<p className="text-muted-foreground mt-2">
							more callbacks
						</p>
					</div>
					<div className="bg-card rounded-2xl p-6 border-2 border-border">
						<p className="text-4xl font-bold text-primary">
							87%
						</p>
						<p className="text-muted-foreground mt-2">
							more confident
						</p>
					</div>
					<div className="bg-card rounded-2xl p-6 border-2 border-border">
						<p className="text-4xl font-bold text-primary">
							8+ hrs
						</p>
						<p className="text-muted-foreground mt-2">
							saved/month
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
