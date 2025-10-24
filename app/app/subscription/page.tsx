/**
 * Subscription Management Page
 * User's subscription dashboard with usage stats
 */

'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
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
import {
  CreditCard,
  TrendingUp,
  MessageSquare,
  Briefcase,
  Calendar,
  Crown,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { PricingTier } from '@/types/subscription';

interface SubscriptionData {
  subscription: {
    tier: PricingTier;
    status: string;
    startDate: string;
    endDate?: string;
    paymentMethod: string;
  } | null;
  usage: {
    jobsCreated: number;
    chatMessages: number;
    currentMonth: string;
  };
  tier: PricingTier;
  config: {
    name: string;
    price: number;
    features: {
      jobsPerMonth: number | 'unlimited';
      chatMessagesPerMonth: number | 'unlimited';
      chatAccess: boolean;
    };
  };
}

export default function SubscriptionPage() {
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelling(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchSubscription();
        alert('Subscription cancelled successfully. You have been moved to the Free tier.');
      } else {
        alert('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  const getUsagePercentage = (
    current: number,
    limit: number | 'unlimited'
  ): number => {
    if (limit === 'unlimited') return 0;
    return Math.min((current / limit) * 100, 100);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading subscription...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center">
        <p>Failed to load subscription data</p>
      </div>
    );
  }

  const jobsLimit = data.config.features.jobsPerMonth;
  const chatLimit = data.config.features.chatMessagesPerMonth;
  const jobsPercentage = getUsagePercentage(data.usage.jobsCreated, jobsLimit);
  const chatPercentage = getUsagePercentage(data.usage.chatMessages, chatLimit);

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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {data.tier === PricingTier.PRO || data.tier === PricingTier.CUSTOM ? (
                <Crown className="h-6 w-6 text-yellow-500" />
              ) : (
                <CreditCard className="h-6 w-6" />
              )}
              <div>
                <CardTitle>{data.config.name} Plan</CardTitle>
                <CardDescription>
                  {data.subscription?.status === 'active'
                    ? 'Your subscription is active'
                    : 'Subscription status: ' + data.subscription?.status}
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={
                data.tier === PricingTier.PRO || data.tier === PricingTier.CUSTOM
                  ? 'default'
                  : 'secondary'
              }
            >
              {data.config.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.subscription?.endDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next billing date:</span>
              <span className="font-medium">
                {format(new Date(data.subscription.endDate), 'MMMM dd, yyyy')}
              </span>
            </div>
          )}

          {data.config.price > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium">${data.config.price}/month</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment method:</span>
            <span className="font-medium capitalize">
              {data.subscription?.paymentMethod || 'None'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          {data.tier === PricingTier.FREE && (
            <Button onClick={() => router.push('/pricing')} className="flex-1">
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          )}
          {data.tier !== PricingTier.FREE && (
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

      {/* Usage Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Jobs Usage */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Jobs Created</CardTitle>
            </div>
            <CardDescription>
              Current month: {format(new Date(data.usage.currentMonth), 'MMMM yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">
                {data.usage.jobsCreated}
              </span>
              <span className="text-muted-foreground">
                / {jobsLimit === 'unlimited' ? '∞' : jobsLimit}
              </span>
            </div>
            {jobsLimit !== 'unlimited' && (
              <div className="space-y-2">
                <Progress value={jobsPercentage} />
                <p className="text-xs text-muted-foreground">
                  {jobsLimit - data.usage.jobsCreated > 0
                    ? `${jobsLimit - data.usage.jobsCreated} jobs remaining`
                    : 'Limit reached'}
                </p>
              </div>
            )}
            {jobsLimit === 'unlimited' && (
              <p className="text-sm text-muted-foreground">
                Unlimited jobs available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Chat Usage */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Chat Messages</CardTitle>
            </div>
            <CardDescription>
              Current month: {format(new Date(data.usage.currentMonth), 'MMMM yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.config.features.chatAccess ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    {data.usage.chatMessages}
                  </span>
                  <span className="text-muted-foreground">
                    / {chatLimit === 'unlimited' ? '∞' : chatLimit}
                  </span>
                </div>
                {chatLimit !== 'unlimited' && (
                  <div className="space-y-2">
                    <Progress value={chatPercentage} />
                    <p className="text-xs text-muted-foreground">
                      {chatLimit - data.usage.chatMessages > 0
                        ? `${chatLimit - data.usage.chatMessages} messages remaining`
                        : 'Limit reached'}
                    </p>
                  </div>
                )}
                {chatLimit === 'unlimited' && (
                  <p className="text-sm text-muted-foreground">
                    Unlimited messages available
                  </p>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Chat not available on Free plan
                </p>
                <Button
                  variant="link"
                  onClick={() => router.push('/pricing')}
                  className="mt-2"
                >
                  Upgrade to access chat
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upgrade CTA */}
      {data.tier === PricingTier.FREE && (
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
                <span>200 AI chat messages per month</span>
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
      )}
    </div>
  );
}
