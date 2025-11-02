import { Briefcase, Github, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

export function HomeFooter() {
	return (
		<footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 py-12">
			<div className="max-w-7xl mx-auto px-4">
				<div className="grid md:grid-cols-3 gap-8 mb-8">
					{/* Left - Logo & Tagline */}
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<Briefcase className="h-6 w-6 text-gray-400" />
							<span className="font-bold text-white">JobTrackr</span>
						</div>
						<p className="text-sm text-gray-400">
							Track your way to success
						</p>
					</div>

					{/* Center - Links */}
					<div className="flex flex-wrap gap-6 justify-center items-center">
						<Link
							href="/pricing"
							className="text-sm text-gray-400 hover:text-white transition-colors">
							Pricing
						</Link>
						<Link
							href="/privacy"
							className="text-sm text-gray-400 hover:text-white transition-colors">
							Privacy
						</Link>
						<Link
							href="/terms"
							className="text-sm text-gray-400 hover:text-white transition-colors">
							Terms
						</Link>
						<Link
							href="/support"
							className="text-sm text-gray-400 hover:text-white transition-colors">
							Support
						</Link>
					</div>

					{/* Right - Social */}
					<div className="flex gap-4 justify-end items-center">
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors">
							<Github className="w-5 h-5" />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors">
							<Twitter className="w-5 h-5" />
						</a>
						<a
							href="mailto:support@jobtrackr.com"
							className="text-gray-400 hover:text-white transition-colors">
							<Mail className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Bottom */}
				<div className="pt-8 border-t border-gray-800 text-center">
					<p className="text-sm text-gray-500">
						© 2025 JobTrackr. Made to help you win.
					</p>
				</div>
			</div>
		</footer>
	);
}
