import { Briefcase } from 'lucide-react';

export function HomeFooter() {
	return (
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
	);
}
