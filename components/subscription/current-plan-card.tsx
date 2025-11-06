'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CreditCard, Crown, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { PricingTier } from '@/types/subscription';
import { cancelSubscription } from '@/hooks/subscription';
import { toast } from 'sonner';

interface CurrentPlanCardProps {
  subscription: {
    tier: PricingTier;
    status: string;
    startDate: string;
    endDate?: string;
    paymentMethod: string;
  };
  tier: PricingTier;
  config: {
    name: string;
    price: number;
  };
  onUpdate: () => void;
}

export function CurrentPlanCard({ subscription, tier, config, onUpdate }: CurrentPlanCardProps) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);

  const handleCancelSubscription = async () => {
    setCancelling(true);

    try {
      await cancelSubscription();
      toast.success('Subscription cancelled successfully. You have been moved to the Free tier.');
      onUpdate();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {tier === PricingTier.PRO || tier === PricingTier.CUSTOM ? (
              <Crown className="h-6 w-6 text-yellow-500" />
            ) : (
              <CreditCard className="h-6 w-6" />
            )}
            <div>
              <CardTitle>{config.name} Plan</CardTitle>
              <CardDescription>
                {subscription.status === 'active'
                  ? 'Your subscription is active'
                  : 'Subscription status: ' + subscription.status}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={
              tier === PricingTier.PRO || tier === PricingTier.CUSTOM
                ? 'default'
                : 'secondary'
            }
          >
            {config.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscription.endDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next billing date:</span>
            <span className="font-medium">
              {format(new Date(subscription.endDate), 'MMMM dd, yyyy')}
            </span>
          </div>
        )}

        {config.price > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-medium">${config.price}/month</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Payment method:</span>
          <span className="font-medium capitalize">
            {subscription.paymentMethod || 'None'}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {tier === PricingTier.FREE && (
          <Button onClick={() => router.push('/pricing')} className="flex-1">
            <Zap className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        )}
        {tier !== PricingTier.FREE && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                Cancel Subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel your subscription? You will be
                  moved to the Free tier and lose access to premium features.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
