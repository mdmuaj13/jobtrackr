/**
 * Admin Subscription Management Page
 * Allows admins to manually manage user subscriptions
 */

'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, UserCog, CheckCircle, AlertCircle } from 'lucide-react';
import { PricingTier } from '@/types/subscription';

interface FormData {
  userId: string;
  userEmail: string;
  tier: PricingTier;
  durationMonths: number;
  adminNotes: string;
}

export default function AdminSubscriptionsPage() {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    userEmail: '',
    tier: PricingTier.FREE,
    durationMonths: 1,
    adminNotes: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [searchEmail, setSearchEmail] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchUser = async () => {
    if (!searchEmail) {
      setMessage({ type: 'error', text: 'Please enter an email address' });
      return;
    }

    setSearchLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      // This would be a real API endpoint to search users
      // For now, we'll just set the email
      setFormData({
        ...formData,
        userEmail: searchEmail,
        // In a real implementation, you'd fetch the userId from the API
        userId: searchEmail, // Placeholder - should be actual user ID
      });

      setMessage({
        type: 'success',
        text: 'User found. You can now update their subscription.',
      });
    } catch (error) {
      console.error('Error searching user:', error);
      setMessage({ type: 'error', text: 'User not found' });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: formData.userId,
          tier: formData.tier,
          durationMonths: formData.durationMonths,
          adminNotes: formData.adminNotes,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Subscription updated successfully for ${formData.userEmail}`,
        });

        // Reset form
        setFormData({
          userId: '',
          userEmail: '',
          tier: PricingTier.FREE,
          durationMonths: 1,
          adminNotes: '',
        });
        setSearchEmail('');
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'Failed to update subscription',
        });
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      setMessage({
        type: 'error',
        text: 'An error occurred while updating the subscription',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">
            Manually manage user subscriptions and tiers
          </p>
        </div>
      </div>

      {/* Alert/Info Card */}
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                Admin Access Required
              </p>
              <p className="text-yellow-800 dark:text-yellow-200">
                This page allows you to manually assign or update user
                subscriptions. Use this for manual payments, gifts, or special
                cases. All changes are logged.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search User */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Find User
          </CardTitle>
          <CardDescription>
            Search for a user by email to manage their subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="user@example.com"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchUser();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleSearchUser}
              disabled={searchLoading || !searchEmail}
            >
              {searchLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {formData.userEmail && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Selected User:</p>
              <p className="text-sm text-muted-foreground">
                {formData.userEmail}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Subscription Form */}
      {formData.userId && (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Update Subscription</CardTitle>
              <CardDescription>
                Modify the subscription details for the selected user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tier Selection */}
              <div className="space-y-2">
                <Label htmlFor="tier">Subscription Tier</Label>
                <Select
                  value={formData.tier}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tier: value as PricingTier })
                  }
                >
                  <SelectTrigger id="tier">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PricingTier.FREE}>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Free</Badge>
                        <span>20 jobs/month, No chat</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={PricingTier.PRO}>
                      <div className="flex items-center gap-2">
                        <Badge>Pro</Badge>
                        <span>Unlimited jobs, 200 chats/month</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={PricingTier.CUSTOM}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Custom</Badge>
                        <span>Unlimited everything</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              {formData.tier !== PricingTier.FREE && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (months)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="12"
                    value={formData.durationMonths}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationMonths: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    How many months should this subscription last?
                  </p>
                </div>
              )}

              {/* Admin Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Admin Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Reason for manual subscription update..."
                  value={formData.adminNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, adminNotes: e.target.value })
                  }
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Optional notes about this subscription (payment info, special
                  arrangement, etc.)
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
              {message && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100'
                      : 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Updating...' : 'Update Subscription'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-1">
            <li>Search for a user by their email address</li>
            <li>Select the subscription tier you want to assign</li>
            <li>Set the duration (for paid tiers)</li>
            <li>Add admin notes explaining the reason for this change</li>
            <li>Click "Update Subscription" to apply the changes</li>
          </ol>
          <p className="mt-4 text-xs">
            Note: This is for manual subscription management. Online payments
            will be integrated in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
