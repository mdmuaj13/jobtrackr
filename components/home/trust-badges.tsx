import { Shield, Users, Star, Lock, CheckCircle, Zap } from 'lucide-react';

interface BadgeProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

const TrustBadge = ({ icon: Icon, text }: BadgeProps) => (
	<div className="flex flex-col items-center gap-2">
		<div className="w-14 h-14 rounded-xl bg-chart-1/40 flex items-center justify-center border-2 border-border">
			<Icon className="w-6 h-6 text-primary" />
		</div>
		<p className="text-sm font-medium text-foreground text-center">
			{text}
		</p>
	</div>
);

export function TrustBadgesSection() {
	const badges = [
		{ icon: Shield, text: 'Secure & Private' },
		// { icon: Users, text: '10K+ Users' },
		{ icon: Star, text: '4.9/5 Rating' },
		{ icon: Lock, text: 'GDPR Compliant' },
		// { icon: CheckCircle, text: 'SOC 2 Certified' },
		{ icon: Zap, text: '8+ Hours Saved' },
	];

	return (
		<section className="px-4 sm:px-6 py-12 md:py-16 bg-background">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
						Trusted by professionals worldwide
					</h2>
				</div>
				
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{badges.map((badge, index) => (
						<TrustBadge key={index} {...badge} />
					))}
				</div>
			</div>
		</section>
	);
}
