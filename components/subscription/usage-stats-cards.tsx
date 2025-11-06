'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Briefcase, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface UsageStatsCardsProps {
  usage: {
    currentMonth: string;
    jobsCreated: number;
    chatMessages: number;
  };
  config: {
    features: {
      jobsPerMonth: number | 'unlimited';
      chatMessagesPerMonth: number | 'unlimited';
      chatAccess: boolean;
    };
  };
}

export function UsageStatsCards({ usage, config }: UsageStatsCardsProps) {
  const router = useRouter();

  const getUsagePercentage = (
    current: number,
    limit: number | 'unlimited'
  ): number => {
    if (limit === 'unlimited') return 0;
    return Math.min((current / limit) * 100, 100);
  };

  const jobsLimit = config.features.jobsPerMonth;
  const chatLimit = config.features.chatMessagesPerMonth;
  const jobsPercentage = getUsagePercentage(usage.jobsCreated, jobsLimit);
  const chatPercentage = getUsagePercentage(usage.chatMessages, chatLimit);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Jobs Usage */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Jobs Created</CardTitle>
          </div>
          <CardDescription>
            Current month: {format(new Date(usage.currentMonth), 'MMMM yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">
              {usage.jobsCreated}
            </span>
            <span className="text-muted-foreground">
              / {jobsLimit === 'unlimited' ? '∞' : jobsLimit}
            </span>
          </div>
          {jobsLimit !== 'unlimited' && (
            <div className="space-y-2">
              <Progress value={jobsPercentage} />
              <p className="text-xs text-muted-foreground">
                {jobsLimit - usage.jobsCreated > 0
                  ? `${jobsLimit - usage.jobsCreated} jobs remaining`
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
            Current month: {format(new Date(usage.currentMonth), 'MMMM yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.features.chatAccess ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  {usage.chatMessages}
                </span>
                <span className="text-muted-foreground">
                  / {chatLimit === 'unlimited' ? '∞' : chatLimit}
                </span>
              </div>
              {chatLimit !== 'unlimited' && (
                <div className="space-y-2">
                  <Progress value={chatPercentage} />
                  <p className="text-xs text-muted-foreground">
                    {chatLimit - usage.chatMessages > 0
                      ? `${chatLimit - usage.chatMessages} messages remaining`
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
  );
}
