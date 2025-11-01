import { Briefcase, Sparkles, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HomeHeader() {
	return (
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
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="hidden sm:flex">
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
	);
}
