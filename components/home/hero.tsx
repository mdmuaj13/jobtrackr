import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
	return (
		<section className="relative px-4 sm:px-6 py-20 md:py-32 overflow-hidden">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950"></div>

			{/* Animated Background Shapes */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
			<div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
			<div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Side - Text */}
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-200 dark:border-blue-800">
							<Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
							<span className="text-sm font-medium text-blue-900 dark:text-blue-100">AI-Powered Job Tracking</span>
						</div>

						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1]">
							Land Your Dream Job{' '}
							<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
								Faster
							</span>
						</h1>

						<p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
							Never lose track of applications. Get AI-powered prep. Land more offers.
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button
								asChild
								size="lg"
								className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 group">
								<Link href="/signup" className="flex items-center gap-2">
									Start Free Trial
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="text-lg px-8 py-6 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500">
								<Link href="#demo">
									Watch Demo
								</Link>
							</Button>
						</div>

						<div className="flex flex-wrap items-center gap-6 pt-4">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
								<span className="text-sm text-gray-600 dark:text-gray-400">No credit card required</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
								<span className="text-sm text-gray-600 dark:text-gray-400">14-day free trial</span>
							</div>
						</div>
					</div>

					{/* Right Side - Interactive Dashboard Preview */}
					<div className="relative">
						{/* Floating Stats Card */}
						<div className="absolute -top-4 -left-4 z-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 animate-float">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
									<TrendingUp className="w-6 h-6 text-white" />
								</div>
								<div>
									<p className="text-xs text-gray-500 dark:text-gray-400">Response Rate</p>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
								</div>
							</div>
						</div>

						{/* Main Dashboard Card */}
						<div className="relative rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
							{/* Header */}
							<div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-lg font-semibold">Your Applications</h3>
									<div className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
										32 Active
									</div>
								</div>
								<div className="grid grid-cols-3 gap-4">
									<div>
										<p className="text-xs text-blue-100">Applied</p>
										<p className="text-2xl font-bold">48</p>
									</div>
									<div>
										<p className="text-xs text-blue-100">Interviews</p>
										<p className="text-2xl font-bold">12</p>
									</div>
									<div>
										<p className="text-xs text-blue-100">Offers</p>
										<p className="text-2xl font-bold">3</p>
									</div>
								</div>
							</div>

							{/* Application Cards */}
							<div className="p-6 space-y-3">
								<div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl border border-blue-200 dark:border-blue-800">
									<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">G</div>
									<div className="flex-1">
										<p className="font-semibold text-gray-900 dark:text-white">Senior Developer</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Google</p>
									</div>
									<div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
										Interview
									</div>
								</div>

								<div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
									<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">M</div>
									<div className="flex-1">
										<p className="font-semibold text-gray-900 dark:text-white">Product Manager</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Meta</p>
									</div>
									<div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
										Applied
									</div>
								</div>

								<div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
									<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">A</div>
									<div className="flex-1">
										<p className="font-semibold text-gray-900 dark:text-white">UX Designer</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Amazon</p>
									</div>
									<div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">
										Resume Review
									</div>
								</div>
							</div>
						</div>

						{/* Floating Success Badge */}
						<div className="absolute -bottom-4 -right-4 z-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-xl p-4 animate-float animation-delay-2000">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-8 h-8 text-white" />
								<div className="text-white">
									<p className="text-xs font-medium">Offer Accepted!</p>
									<p className="text-lg font-bold">$120K</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
