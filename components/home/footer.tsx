import { Briefcase, Github, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

export function HomeFooter() {
	return (
		<footer className="bg-muted/30 border-t-2 border-border py-12">
			<div className="max-w-7xl mx-auto px-4">
				<div className="grid md:grid-cols-3 gap-8 mb-8">
					{/* Left - Logo & Tagline */}
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<Briefcase className="h-6 w-6 text-primary" />
							<span className="font-bold text-foreground">JobTrackr</span>
						</div>
						<p className="text-sm text-muted-foreground">
							Track your way to success
						</p>
					</div>

					{/* Center - Links */}
					<div className="flex flex-wrap gap-6  md:justify-center md:items-center">
						<Link
							href="/pricing"
							className="text-sm text-muted-foreground hover:text-primary transition-colors">
							Pricing
						</Link>
						<Link
							href="/privacy"
							className="text-sm text-muted-foreground hover:text-primary transition-colors">
							Privacy
						</Link>
						<Link
							href="/terms"
							className="text-sm text-muted-foreground hover:text-primary transition-colors">
							Terms
						</Link>
						<Link
							href="/support"
							className="text-sm text-muted-foreground hover:text-primary transition-colors">
							Support
						</Link>
					</div>

					{/* Right - Social */}
					<div className="flex gap-4 md:justify-end items-center">
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary transition-colors">
							<Github className="w-5 h-5" />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary transition-colors">
							<Twitter className="w-5 h-5" />
						</a>
						<a
							href="mailto:support@jobtrackr.com"
							className="text-muted-foreground hover:text-primary transition-colors">
							<Mail className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Bottom */}
				<div className="pt-8 border-t-2 border-border text-center">
					<p className="text-sm text-muted-foreground">
						© 2025 JobTrackr. Made to help you win.
					</p>
				</div>
			</div>
		</footer>
	);
}
