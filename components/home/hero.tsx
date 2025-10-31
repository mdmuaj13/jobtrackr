import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
	return (
		<section className="relative px-4 sm:px-6 py-20 md:py-32 overflow-hidden bg-background">
			{/* Subtle Background Shapes - using accent colors */}
			<div className="absolute top-40 left-1/4 w-64 h-64 bg-chart-1/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
			<div className="absolute bottom-20 right-1/4 w-72 h-72 bg-chart-2/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Side - Text */}
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-sm border-2 border-border shadow-sm">
							<Sparkles className="w-4 h-4 text-primary" />
							<span className="text-sm font-medium text-foreground">AI-Powered Job Tracking</span>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1]">
							Land Your Dream Job{' '}
							<span className="bg-secondary px-2 text-foreground">
								Faster
							</span>
						</h1>

						<p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
							Never lose track of applications. Get AI-powered prep. Land more offers.
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button
								asChild
								size="lg"
								className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg group">
								<Link href="/signup" className="flex items-center gap-2">
									Start Free Trial
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								disabled
								variant="outline"
								className="text-base px-8 py-6 border-2 hover:border-primary transition-colors">
								<Link href="#" >
									Watch Demo
								</Link>
							</Button>
						</div>

						<div className="flex flex-wrap items-center gap-6 pt-2">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-chart-1" />
								<span className="text-sm text-muted-foreground">No credit card required</span>
							</div>
							{/* <div className="flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-chart-1" />
								<span className="text-sm text-muted-foreground">14-day free trial</span>
							</div> */}
						</div>
					</div>

					{/* Right Side - Interactive Dashboard Preview */}
					<div className="relative">
						{/* Floating Stats Card */}
						<div className="absolute -top-6 -left-6 z-20 bg-card rounded-2xl shadow-lg border-2 border-border p-4 animate-float">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-xl bg-chart-1 flex items-center justify-center shadow-md">
									<TrendingUp className="w-6 h-6 text-primary" />
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Response Rate</p>
									<p className="text-xl font-bold text-card-foreground">78%</p>
								</div>
							</div>
						</div>

						{/* Main Dashboard Card */}
						<div className="relative rounded-2xl bg-card border-2 border-border shadow-xl overflow-hidden">
							{/* Header */}
							<div className="bg-primary p-5 text-primary-foreground">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-lg font-semibold">Your Applications</h3>
									<div className="text-sm bg-secondary/90 text-secondary-foreground backdrop-blur-sm px-3 py-1 rounded-full">
										32 Active
									</div>
								</div>
								<div className="grid grid-cols-3 gap-3">
									<div className="text-center">
										<p className="text-xs opacity-80">Applied</p>
										<p className="text-xl font-bold">48</p>
									</div>
									<div className="text-center">
										<p className="text-xs opacity-80">Interviews</p>
										<p className="text-xl font-bold">12</p>
									</div>
									<div className="text-center">
										<p className="text-xs opacity-80">Offers</p>
										<p className="text-xl font-bold">3</p>
									</div>
								</div>
							</div>

							{/* Application Cards */}
							<div className="p-5 space-y-4 bg-muted/30">
								<div className="flex items-center gap-3 p-3 bg-chart-4/40 rounded-lg border-2 border-chart-4/60">
									<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">G</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-card-foreground truncate">Senior Developer</p>
										<p className="text-sm text-muted-foreground">Google</p>
									</div>
									<div className="px-2.5 py-1 bg-chart-1 text-primary rounded-full text-xs font-medium whitespace-nowrap">
										Interview
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 bg-card rounded-lg border-2 border-border">
									<div className="w-10 h-10 rounded-lg bg-chart-3/60 flex items-center justify-center text-primary font-bold text-sm">M</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-card-foreground truncate">Product Manager</p>
										<p className="text-sm text-muted-foreground">Meta</p>
									</div>
									<div className="px-2.5 py-1 bg-chart-2/60 text-primary rounded-full text-xs font-medium whitespace-nowrap">
										Applied
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 bg-card rounded-lg border-2 border-border">
									<div className="w-10 h-10 rounded-lg bg-destructive flex items-center justify-center text-destructive-foreground font-bold text-sm">A</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-card-foreground truncate">UX Designer</p>
										<p className="text-sm text-muted-foreground">Amazon</p>
									</div>
									<div className="px-2.5 py-1 bg-accent/60 text-accent-foreground rounded-full text-xs font-medium whitespace-nowrap">
										Resume Review
									</div>
								</div>
							</div>
						</div>

						{/* Floating Success Badge */}
						<div className="absolute -bottom-6 -right-6 z-20 bg-chart-1 rounded-xl shadow-lg p-3 animate-float animation-delay-2000">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-6 h-6 text-primary" />
								<div className="text-primary">
									<p className="text-xs font-medium">Offer Accepted!</p>
									<p className="text-base font-bold">$120K</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
