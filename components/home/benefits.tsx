import {
	Brain,
	Target,
	TrendingUp,
	Sparkles,
	CheckCircle2,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BenefitItemProps {
	text: string;
}

const BenefitItem = ({ text }: BenefitItemProps) => (
	<div className="flex items-start gap-3">
		<CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
		<span className="text-muted-foreground">{text}</span>
	</div>
);

export function BenefitsSection() {
	const benefits = [
		'Centralize all job applications in one place',
		'Get AI-powered resume and cover letter suggestions',
		'Track application status and follow-up actions',
		'Analyze your job search performance with detailed metrics',
		'Prepare for interviews with contextual insights',
		'Stay organized with automated reminders and timelines',
	];

	return (
		<section className="px-4 py-16 md:py-20 bg-muted/30">
			<div className="max-w-6xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-1/40 border-2 border-border">
							<TrendingUp className="w-4 h-4 text-primary" />
							<span className="text-sm font-medium text-foreground">
								Smart Job Hunting
							</span>
						</div>

						<h2 className="text-3xl sm:text-4xl font-bold text-foreground">
							Why JobTrackr?
						</h2>

						<p className="text-lg text-muted-foreground">
							Job hunting can be overwhelming. JobTrackr simplifies the
							process by giving you a centralized hub to manage everything,
							with AI assistance every step of the way.
						</p>

						<div className="space-y-4 pt-4">
							{benefits.map((benefit, index) => (
								<BenefitItem key={index} text={benefit} />
							))}
						</div>

						<div className="pt-6">
							<Button
								asChild
								size="lg"
								className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
								<Link href="/signup" className="flex items-center gap-2">
									Get Started Free
									<ArrowRight className="w-5 h-5" />
								</Link>
							</Button>
						</div>
					</div>

					<div className="relative">
						<div className="aspect-square rounded-2xl bg-primary p-1">
							<div className="h-full w-full rounded-xl bg-card p-8 flex items-center justify-center shadow-lg">
								<div className="space-y-6 w-full">
									<div className="flex items-center gap-4 p-4 rounded-lg bg-chart-1/40 border-2 border-border">
										<Brain className="w-8 h-8 text-primary" />
										<div>
											<p className="font-semibold text-card-foreground">
												AI Analysis
											</p>
											<p className="text-sm text-muted-foreground">
												Context-aware suggestions
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 rounded-lg bg-muted border-2 border-border">
										<Target className="w-8 h-8 text-muted-foreground" />
										<div>
											<p className="font-semibold text-card-foreground">
												Track Progress
											</p>
											<p className="text-sm text-muted-foreground">
												Monitor every application
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 rounded-lg bg-chart-2/40 border-2 border-border">
										<Sparkles className="w-8 h-8 text-primary" />
										<div>
											<p className="font-semibold text-card-foreground">
												Smart Insights
											</p>
											<p className="text-sm text-muted-foreground">
												Data-driven decisions
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
