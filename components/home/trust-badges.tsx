import { Shield, Users, Star, Lock, CheckCircle, Zap } from 'lucide-react';

interface BadgeProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

const TrustBadge = ({ icon: Icon, text }: BadgeProps) => (
	<div className="flex flex-col items-center gap-2">
		<div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
			<Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
		</div>
		<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
			{text}
		</p>
	</div>
);

export function TrustBadgesSection() {
	const badges = [
		{ icon: Shield, text: 'Secure & Private' },
		{ icon: Users, text: '10,000+ Users' },
		{ icon: Star, text: '4.9/5 Rating' },
		{ icon: Lock, text: 'GDPR Compliant' },
		{ icon: CheckCircle, text: 'SOC 2 Certified' },
		{ icon: Zap, text: '8+ Hours Saved/Month' },
	];

	return (
		<section className="px-4 sm:px-6 py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
					{badges.map((badge, index) => (
						<TrustBadge key={index} {...badge} />
					))}
				</div>
			</div>
		</section>
	);
}
