'use client';

import { Briefcase, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function HomeHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="w-full border-b-2 border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
			<div className="max-w-7xl mx-auto py-4 px-4">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						<Briefcase className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
						<span className="text-lg sm:text-xl font-bold text-foreground">
							JobTrackr
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-3">
						<Button asChild variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-muted">
							<Link href="/login">Login</Link>
						</Button>
						<Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
							<Link href="/signup">Get Started</Link>
						</Button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg"
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
					<div className="md:hidden mt-4 pb-4 border-t-2 border-border pt-4">
						<div className="flex flex-col gap-3">
							<Button
								asChild
								variant="outline"
								className="w-full justify-center border-2"
								onClick={() => setMobileMenuOpen(false)}>
								<Link href="/login">Login</Link>
							</Button>
							<Button
								asChild
								className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
