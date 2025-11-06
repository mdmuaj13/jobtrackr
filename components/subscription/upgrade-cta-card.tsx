'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Crown, MessageSquare, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PricingTier } from '@/types/subscription';

interface UpgradeCtaCardProps {
  tier: PricingTier;
}

export function UpgradeCtaCard({ tier }: UpgradeCtaCardProps) {
  const router = useRouter();

  // Only show for free users
  if (tier !== PricingTier.FREE) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Unlock More Features</CardTitle>
        </div>
        <CardDescription>
          Upgrade to Pro for unlimited jobs and AI chat assistance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Unlimited job applications per month</span>
          </li>
          <li className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span>1000 AI chat messages per month</span>
          </li>
          <li className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" />
            <span>Priority support</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push('/pricing')} className="w-full">
          View Plans
        </Button>
      </CardFooter>
    </Card>
  );
}
