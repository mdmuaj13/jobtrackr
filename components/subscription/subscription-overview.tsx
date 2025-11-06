'use client';

import { useSubscription } from '@/hooks/subscription';
import { CurrentPlanCard } from './current-plan-card';
import { UsageStatsCards } from './usage-stats-cards';
import { UpgradeCtaCard } from './upgrade-cta-card';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

export function SubscriptionOverview() {
  const { data: subscriptionData, error, mutate } = useSubscription();

  if (error) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load subscription data</p>
          <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!subscriptionData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading subscription...</p>
        </div>
      </div>
    );
  }

  const { subscription, usage, tier, config } = subscriptionData.data;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and view usage statistics
        </p>
      </div>

      {/* Current Plan */}
      <CurrentPlanCard
        subscription={subscription}
        tier={tier}
        config={config}
        onUpdate={() => mutate()}
      />

      {/* Usage Stats */}
      <UsageStatsCards usage={usage} config={config} />

      {/* Upgrade CTA */}
      <UpgradeCtaCard tier={tier} />
    </div>
  );
}
