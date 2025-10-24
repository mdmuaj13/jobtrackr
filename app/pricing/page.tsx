/**
 * Pricing Page
 * Displays all available pricing tiers
 */

'use client';

import { useEffect, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PricingTierConfig } from '@/types/subscription';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const [tiers, setTiers] = useState<PricingTierConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPricingTiers();
  }, []);

  const fetchPricingTiers = async () => {
    try {
      const response = await fetch('/api/pricing');
      const data = await response.json();

      if (response.ok) {
        setTiers(data.data);
      }
    } catch (error) {
      console.error('Error fetching pricing tiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (tier: string) => {
    if (tier === 'free') {
      router.push('/signup');
    } else if (tier === 'custom') {
      // Contact sales or admin
      window.location.href = 'mailto:support@jobtrackr.com?subject=Custom Plan Inquiry';
    } else {
      // For Pro tier - would integrate with payment gateway in the future
      router.push('/app/subscription');
    }
  };

  const formatFeatureValue = (value: number | string | boolean) => {
    if (value === 'unlimited') return 'Unlimited';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'number') return value.toLocaleString();
    return value;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your job search journey. Upgrade or
            downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.tier}
              className={`relative ${
                tier.highlighted
                  ? 'border-primary shadow-xl scale-105'
                  : 'border-border'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Sparkles className="h-3 w-3 mr-1 inline" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-base">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="mb-6">
                  {tier.price === 0 ? (
                    <div className="text-4xl font-bold">Free</div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-muted-foreground">
                        /{tier.billingPeriod === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {/* Jobs */}
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>
                        {formatFeatureValue(tier.features.jobsPerMonth)}
                      </strong>{' '}
                      jobs per month
                    </span>
                  </div>

                  {/* Chat */}
                  {tier.features.chatAccess ? (
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        AI Chat (
                        {formatFeatureValue(
                          tier.features.chatMessagesPerMonth
                        )}{' '}
                        messages/month)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 opacity-50">
                      <span className="h-5 w-5 flex-shrink-0">✕</span>
                      <span className="text-sm line-through">
                        AI Chat access
                      </span>
                    </div>
                  )}

                  {/* Calendar */}
                  {tier.features.calendarAccess && (
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Calendar & Events</span>
                    </div>
                  )}

                  {/* Export */}
                  {tier.features.exportData ? (
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Export data</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 opacity-50">
                      <span className="h-5 w-5 flex-shrink-0">✕</span>
                      <span className="text-sm line-through">Export data</span>
                    </div>
                  )}

                  {/* Support */}
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      {tier.features.prioritySupport
                        ? 'Priority support'
                        : 'Email support'}
                    </span>
                  </div>

                  {/* Custom features */}
                  {tier.features.customFeatures?.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(tier.tier)}
                >
                  {tier.tier === 'free'
                    ? 'Get Started'
                    : tier.tier === 'custom'
                    ? 'Contact Sales'
                    : 'Upgrade Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ or additional info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need help choosing?{' '}
            <a href="mailto:support@jobtrackr.com" className="text-primary hover:underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
