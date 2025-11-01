import { HomeHeader } from '@/components/home/header';
import { HeroSection } from '@/components/home/hero';
import { FeaturesSection } from '@/components/home/features';
import { BenefitsSection } from '@/components/home/benefits';
import { PricingSection } from '@/components/home/pricing';
import { CTASection } from '@/components/home/cta';
import { HomeFooter } from '@/components/home/footer';

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<HomeHeader />
			<HeroSection />
			<FeaturesSection />
			<BenefitsSection />
			<PricingSection />
			<CTASection />
			<HomeFooter />
		</div>
	);
}
