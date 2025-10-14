import {
	Briefcase,
	Brain,
	Target,
	TrendingUp,
	FileText,
	Calendar,
	Sparkles,
	CheckCircle2,
	ArrowRight,
	LogIn,
	UserPlus,
	BarChart3,
	MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FeatureCard = ({
	title,
	description,
	icon: Icon,
	color,
}: {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}) => (
	<div className="group relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
		<div
			className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color} bg-opacity-10`}>
			<Icon className={`w-6 h-6 ${color}`} />
		</div>
		<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
			{title}
		</h3>
		<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
			{description}
		</p>
	</div>
);

const BenefitItem = ({ text }: { text: string }) => (
	<div className="flex items-start gap-3">
		<CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
		<span className="text-gray-700 dark:text-gray-300">{text}</span>
	</div>
);

export default function Home() {
	const features = [
		{
			title: 'Application Tracking',
			description:
				'Track every application from submission to offer. Never lose sight of your job search progress.',
			icon: Target,
			color: 'text-gray-700',
		},
		{
			title: 'AI-Powered Insights',
			description:
				'Get intelligent recommendations and insights powered by LLM. Tailored advice based on your profile and job requirements.',
			icon: Brain,
			color: 'text-blue-600',
		},
		{
			title: 'Interview Preparation',
			description:
				'Prepare for interviews with AI-generated questions and tips specific to each role and company.',
			icon: MessageSquare,
			color: 'text-blue-500',
		},
		{
			title: 'Document Management',
			description:
				'Store and organize resumes, cover letters, and other documents. Access them anytime, anywhere.',
			icon: FileText,
			color: 'text-gray-600',
		},
		{
			title: 'Analytics & Reports',
			description:
				'Visualize your job search metrics. Track response rates, interview conversion, and more.',
			icon: BarChart3,
			color: 'text-blue-700',
		},
		{
			title: 'Smart Reminders',
			description:
				'Never miss a deadline or follow-up. Get intelligent reminders for follow-ups and interviews.',
			icon: Calendar,
			color: 'text-gray-700',
		},
	];

	const benefits = [
		'Centralize all job applications in one place',
		'Get AI-powered resume and cover letter suggestions',
		'Track application status and follow-up actions',
		'Analyze your job search performance with detailed metrics',
		'Prepare for interviews with contextual insights',
		'Stay organized with automated reminders and timelines',
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			{/* Header */}
			<header className="w-full border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<div className="relative">
								<Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
								<Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 absolute -top-1 -right-1" />
							</div>
							<span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
								JobTrackr
							</span>
						</div>
						<nav className="flex gap-2 sm:gap-3">
							<Button asChild variant="ghost" size="sm" className="hidden sm:flex">
								<Link href="/login" className="flex items-center gap-2">
									<LogIn className="h-4 w-4" />
									Login
								</Link>
							</Button>
							<Button
								asChild
								size="sm"
								className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
								<Link href="/signup" className="flex items-center gap-2">
									<UserPlus className="h-4 w-4 sm:flex hidden" />
									<span className="text-sm sm:text-base">Get Started</span>
								</Link>
							</Button>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 sm:py-32 relative overflow-hidden">
				{/* Colorful Gradient Background - Light Mode */}
				<div
					className="absolute inset-0 -top-40 left-0 right-0 h-[600px] -z-10 opacity-60 dark:hidden"
					style={{
						background: 'linear-gradient(282deg, #ffffff 11%, rgba(159, 252, 220, 0.72) 25%, rgba(64, 198, 255, 0.63) 34%, rgba(171, 182, 255, 0.85) 47%, rgba(226, 138, 255, 0.96) 59%, #ffffff 90%)',
						filter: 'blur(80px)',
					}}
				></div>
				{/* Colorful Gradient Background - Dark Mode */}
				<div
					className="absolute inset-0 -top-40 left-0 right-0 h-[600px] -z-10 opacity-30 hidden dark:block"
					style={{
						background: 'linear-gradient(282deg, #1a1a1a 11%, rgba(64, 198, 255, 0.3) 25%, rgba(100, 150, 255, 0.25) 34%, rgba(171, 182, 255, 0.35) 47%, rgba(226, 138, 255, 0.4) 59%, #1a1a1a 90%)',
						filter: 'blur(80px)',
					}}
				></div>

				<div className="max-w-5xl mx-auto text-center space-y-10">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
						<Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							AI-Powered Platform
						</span>
					</div>

					{/* Main Heading with Emoji */}
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
						<span className="block text-gray-900 dark:text-white">
							Say 👋 Hello to
						</span>
						<span className="flex items-center justify-center gap-4 mt-2">
							<Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 dark:text-blue-400" />
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200">
								JobTrackr
							</span>
						</span>
					</h1>

					{/* Subtitle */}
					<p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
						Track job applications with ease using our AI-powered platform.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
						<Button
							asChild
							size="lg"
							className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 text-base sm:text-lg px-8 py-6 rounded-lg font-medium">
							<Link href="/signup" className="flex items-center gap-2">
								Explore Features
								<ArrowRight className="w-5 h-5" />
							</Link>
						</Button>
						<Button
							asChild
							variant="ghost"
							size="lg"
							className="text-base sm:text-lg px-8 py-6 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
							<Link href="/app/dashboard" className="flex items-center gap-2">
								Play Video
								<Sparkles className="w-5 h-5" />
							</Link>
						</Button>
					</div>

					{/* Trust Indicator */}
					<p className="text-sm text-gray-500 dark:text-gray-500 pt-4">
						Trusted by 2+ Job Seekers Worldwide 😑
					</p>

					{/* Animated Feature Icons */}
					<div className="relative pt-12 pb-8">
						<div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 overflow-x-auto no-scrollbar">
							<div className="flex items-center gap-3 px-4 py-2 animate-float">
								<Target className="w-6 h-6 text-gray-700 dark:text-gray-300" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
									Tracking
								</span>
							</div>
							<div className="flex items-center gap-3 px-4 py-2 animate-float-delayed">
								<Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
									AI Insights
								</span>
							</div>
							<div className="flex items-center gap-3 px-4 py-2 animate-float">
								<BarChart3 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
									Analytics
								</span>
							</div>
							<div className="flex items-center gap-3 px-4 py-2 animate-float-delayed">
								<Calendar className="w-6 h-6 text-gray-700 dark:text-gray-300" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
									Reminders
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
				<div className="max-w-6xl mx-auto">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
							Everything You Need to Succeed
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Powerful features designed to streamline your job search and
							maximize your chances of success
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, index) => (
							<FeatureCard key={index} {...feature} />
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="container mx-auto px-4 py-20">
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

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-20">
				<div className="max-w-4xl mx-auto">
					<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 p-12 text-center">
						<div className="relative z-10 space-y-6">
							<h2 className="text-3xl sm:text-4xl font-bold text-white">
								Ready to Transform Your Job Search?
							</h2>
							<p className="text-xl text-gray-200 max-w-2xl mx-auto">
								Join thousands of job seekers who are landing their dream jobs
								with JobTrackr
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
								<Button
									asChild
									size="lg"
									className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
									<Link href="/signup" className="flex items-center gap-2">
										Get Started Now
										<ArrowRight className="w-5 h-5" />
									</Link>
								</Button>
								<Button
									asChild
									size="lg"
									variant="outline"
									className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20">
									<Link href="/app/dashboard">View Demo</Link>
								</Button>
							</div>
						</div>
						<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-gray-200 dark:border-gray-700 py-8">
				<div className="container mx-auto px-4">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
						<div className="flex items-center space-x-2">
							<Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
							<span className="font-bold text-gray-900 dark:text-white">
								JobTrackr
							</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							© 2025 JobTrackr. Your AI-powered job search partner.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
