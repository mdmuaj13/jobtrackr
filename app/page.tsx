import { HomeHeader } from '@/components/home/header';
import { HeroSection } from '@/components/home/hero';
import { ProblemSection } from '@/components/home/problem';
import { SolutionSection } from '@/components/home/solution';
import { HowItWorksSection } from '@/components/home/how-it-works';
import { FeaturesSection } from '@/components/home/features';
import { DashboardShowcaseSection } from '@/components/home/dashboard-showcase';
import { TestimonialsSection } from '@/components/home/testimonials';
import { PricingSection } from '@/components/home/pricing';
import { TrustBadgesSection } from '@/components/home/trust-badges';
import { CTASection } from '@/components/home/cta';
import { HomeFooter } from '@/components/home/footer';

export default function Home() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<HomeHeader />
			<HeroSection />
			<ProblemSection />
			<SolutionSection />
			<HowItWorksSection />
			<FeaturesSection />
			<DashboardShowcaseSection />
			<TestimonialsSection />
			<PricingSection />
			<TrustBadgesSection />
			<CTASection />
			<HomeFooter />
		</div>
	);
}
