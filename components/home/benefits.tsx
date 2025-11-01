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
		<CheckCircle2 className="w-5 h-5 text-[hsl(var(--chart-1))] flex-shrink-0 mt-0.5" />
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
		<section className="px-4 py-20">
			<div className="max-w-6xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600">
							<TrendingUp className="w-4 h-4 text-gray-700 dark:text-gray-300" />
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Smart Job Hunting
							</span>
						</div>

						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
							Why JobTrackr?
						</h2>

						<p className="text-lg text-gray-600 dark:text-gray-300">
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
								className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black dark:from-gray-600 dark:to-gray-700">
								<Link href="/signup" className="flex items-center gap-2">
									Get Started Free
									<ArrowRight className="w-5 h-5" />
								</Link>
							</Button>
						</div>
					</div>

					<div className="relative">
						<div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-1">
							<div className="h-full w-full rounded-xl bg-white dark:bg-gray-800 p-8 flex items-center justify-center">
								<div className="space-y-6 w-full">
									<div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
										<Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">
												AI Analysis
											</p>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Context-aware suggestions
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-700/50">
										<Target className="w-8 h-8 text-gray-700 dark:text-gray-300" />
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">
												Track Progress
											</p>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Monitor every application
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-800/30">
										<Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">
												Smart Insights
											</p>
											<p className="text-sm text-gray-600 dark:text-gray-400">
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
