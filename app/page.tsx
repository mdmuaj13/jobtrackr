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
	<div className="group relative overflow-hidden rounded-xl p-6 bg-card border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
		<div
			className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color} bg-opacity-10`}>
			<Icon className={`w-6 h-6 ${color}`} />
		</div>
		<h3 className="text-lg font-semibold text-card-foreground mb-2">
			{title}
		</h3>
		<p className="text-sm text-muted-foreground leading-relaxed">
			{description}
		</p>
	</div>
);

const BenefitItem = ({ text }: { text: string }) => (
	<div className="flex items-start gap-3">
		<CheckCircle2 className="w-5 h-5 text-[hsl(var(--chart-1))] flex-shrink-0 mt-0.5" />
		<span className="text-muted-foreground">{text}</span>
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
				<div className="max-w-6xl mx-auto py-4">
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
			<section className="px-4 py-16 sm:py-24 relative overflow-hidden">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 -top-40 left-0 right-0 h-[600px] -z-10 opacity-50 dark:opacity-30">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
					<div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
				</div>

				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div className="space-y-10">
							{/* Badge */}
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
								<Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									AI-Powered Job Search Platform
								</span>
							</div>

							{/* Main Heading */}
							<div>
								<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
									<span className="block">Job Search</span> 
									<span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Done Right</span>
								</h1>
								<p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
									AI-powered tools to track applications, optimize your resume, and land your dream job 3x faster. Join thousands of successful job seekers.
								</p>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-3 gap-6 pt-4">
								<div>
									<p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">98%</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
								</div>
								<div>
									<p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">2K+</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">Jobs Landed</p>
								</div>
								<div>
									<p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">5x</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">Faster Results</p>
								</div>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
								<Button
									asChild
									size="lg"
									className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base sm:text-lg px-8 py-5 rounded-lg font-medium min-w-[200px]">
									<Link href="/signup" className="flex items-center gap-2 justify-center">
										Start Free Trial
										<ArrowRight className="w-5 h-5" />
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="text-base sm:text-lg px-8 py-5 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600 min-w-[200px]">
									<Link href="/demo" className="flex items-center gap-2 justify-center">
										Watch Demo
										<Sparkles className="w-5 h-5" />
									</Link>
								</Button>
							</div>

							{/* Trust Indicators */}
							<div className="flex items-center gap-8 pt-4">
								<div className="flex items-center gap-2">
									<CheckCircle2 className="w-5 h-5 text-green-500" />
									<span className="text-sm text-gray-600 dark:text-gray-400">No credit card required</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle2 className="w-5 h-5 text-green-500" />
									<span className="text-sm text-gray-600 dark:text-gray-400">Free 14-day trial</span>
								</div>
							</div>
						</div>

						{/* Hero Visual */}
						<div className="relative">
							{/* Main Dashboard Card */}
							<div className="relative rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl overflow-hidden">
								{/* Dashboard Header */}
								<div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-6 py-4 border-b border-gray-700">
									<div className="flex justify-between items-center">
										<h3 className="text-white font-semibold">Job Dashboard</h3>
										<div className="flex space-x-2">
											<div className="w-3 h-3 rounded-full bg-red-500"></div>
											<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
											<div className="w-3 h-3 rounded-full bg-green-500"></div>
										</div>
									</div>
								</div>
								
								{/* Dashboard Content */}
								<div className="p-6">
									<div className="grid grid-cols-2 gap-4 mb-6">
										<div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
											<p className="text-blue-400 text-sm">Applications</p>
											<p className="text-white text-2xl font-bold">24</p>
											<p className="text-green-400 text-xs mt-1">+3 this week</p>
										</div>
										<div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
											<p className="text-purple-400 text-sm">Interviews</p>
											<p className="text-white text-2xl font-bold">7</p>
											<p className="text-green-400 text-xs mt-1">+2 this week</p>
										</div>
									</div>
									
									<div className="bg-gray-700/50 rounded-lg p-4 mb-6">
										<div className="flex justify-between items-center mb-3">
											<span className="text-gray-300 font-medium">Frontend Developer</span>
											<span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Interview</span>
										</div>
										<div className="flex items-center text-sm text-gray-400 mb-2">
											<Target className="w-4 h-4 mr-2" />
											<span>Acme Inc.</span>
											<span className="mx-2">•</span>
											<span>San Francisco</span>
										</div>
										<div className="flex items-center gap-2 mt-3">
											<div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
												<div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4"></div>
											</div>
											<span className="text-xs text-gray-400">75%</span>
										</div>
									</div>
									
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-2">
											<div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
												<Brain className="w-4 h-4 text-white" />
											</div>
											<div>
												<p className="text-white text-sm font-medium">AI Assistant</p>
												<p className="text-gray-400 text-xs">Optimized your resume</p>
											</div>
										</div>
										<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
											View
										</Button>
									</div>
								</div>
							</div>
							
							{/* Floating Elements */}
							<div className="absolute -top-6 -right-6 w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg z-10 flex items-center justify-center">
								<FileText className="w-8 h-8 text-white" />
							</div>
							
							<div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg z-10 flex items-center justify-center">
								<TrendingUp className="w-10 h-10 text-white" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="px-4 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
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

			{/* CTA Section */}
			<section className="px-4 py-20">
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
				<div className="max-w-6xl mx-auto ">
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
