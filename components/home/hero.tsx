import {
	Brain,
	Target,
	FileText,
	Sparkles,
	CheckCircle2,
	ArrowRight,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
	return (
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
								<span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
									Done Right
								</span>
							</h1>
							<p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
								AI-powered tools to track applications, optimize your resume,
								and land your dream job 3x faster. Join thousands of
								successful job seekers.
							</p>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-6 pt-4">
							<div>
								<p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
									98%
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Satisfaction
								</p>
							</div>
							<div>
								<p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
									2K+
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Jobs Landed
								</p>
							</div>
							<div>
								<p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
									5x
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Faster Results
								</p>
							</div>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
							<Button
								asChild
								size="lg"
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base sm:text-lg px-8 py-5 rounded-lg font-medium min-w-[200px]">
								<Link
									href="/signup"
									className="flex items-center gap-2 justify-center">
									Start Free Trial
									<ArrowRight className="w-5 h-5" />
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="text-base sm:text-lg px-8 py-5 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600 min-w-[200px]">
								<Link
									href="/demo"
									className="flex items-center gap-2 justify-center">
									Watch Demo
									<Sparkles className="w-5 h-5" />
								</Link>
							</Button>
						</div>

						{/* Trust Indicators */}
						<div className="flex items-center gap-8 pt-4">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-green-500" />
								<span className="text-sm text-gray-600 dark:text-gray-400">
									No credit card required
								</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-green-500" />
								<span className="text-sm text-gray-600 dark:text-gray-400">
									Free 14-day trial
								</span>
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
										<p className="text-green-400 text-xs mt-1">
											+3 this week
										</p>
									</div>
									<div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
										<p className="text-purple-400 text-sm">Interviews</p>
										<p className="text-white text-2xl font-bold">7</p>
										<p className="text-green-400 text-xs mt-1">
											+2 this week
										</p>
									</div>
								</div>

								<div className="bg-gray-700/50 rounded-lg p-4 mb-6">
									<div className="flex justify-between items-center mb-3">
										<span className="text-gray-300 font-medium">
											Frontend Developer
										</span>
										<span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
											Interview
										</span>
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
											<p className="text-white text-sm font-medium">
												AI Assistant
											</p>
											<p className="text-gray-400 text-xs">
												Optimized your resume
											</p>
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
	);
}
