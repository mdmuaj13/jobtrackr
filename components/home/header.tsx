'use client';

import { Briefcase, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function HomeHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="w-full border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 backdrop-blur-md z-50">
			<div className="max-w-7xl mx-auto py-4">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						<Briefcase className="h-6 w-6 sm:h-7 sm:w-7 text-gray-900 dark:text-white" />
						<span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
							JobTrackr
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-3">
						<Button asChild variant="ghost" size="sm">
							<Link href="/login">Login</Link>
						</Button>
						<Button asChild size="sm">
							<Link href="/signup">Get Started</Link>
						</Button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 text-gray-900 dark:text-white"
						aria-label="Toggle menu">
						{mobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
						<div className="flex flex-col gap-3">
							<Button
								asChild
								variant="ghost"
								className="w-full justify-start"
								onClick={() => setMobileMenuOpen(false)}>
								<Link href="/login">Login</Link>
							</Button>
							<Button
								asChild
								className="w-full"
								onClick={() => setMobileMenuOpen(false)}>
								<Link href="/signup">Get Started</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
