/**
 * Chat Page (In Progress)
 * AI-powered chat assistant for job seekers
 * Protected by subscription tier - Pro and Custom tiers only
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/subscription';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Lock, Zap, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ChatPage() {
  const router = useRouter();
  const { data, loading, canAccessChat, canSendChatMessage, tier, usage } =
    useSubscription();

  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);

  useEffect(() => {
    checkChatAccess();
  }, []);

  const checkChatAccess = async () => {
    const result = await canAccessChat();
    setHasAccess(result.allowed);
    setCheckingAccess(false);

    if (!result.allowed) {
      console.log('Chat access denied:', result.reason);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Check if user can send message
    const canSend = await canSendChatMessage();

    if (!canSend.allowed) {
      alert(canSend.reason);
      return;
    }

    // Add user message to chat
    const userMessage = { role: 'user' as const, content: message };
    setChatMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant' as const,
        content:
          'This is a placeholder response. AI chat integration is in progress. Once implemented, I can help you with job search advice, resume tips, interview preparation, and more!',
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    // Record usage (this would be done by the actual chat API)
    // The API endpoint would call SubscriptionService.recordChatMessage()
  };

  if (loading || checkingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  // Access Denied - Free Tier
  if (!hasAccess) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <Lock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <CardTitle className="text-2xl">Chat Access Required</CardTitle>
            <CardDescription className="text-base">
              AI Chat is available on Pro and Custom plans
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <MessageSquare className="h-4 w-4" />
              <AlertDescription>
                You're currently on the <strong>{data?.config.name}</strong> plan.
                Upgrade to access our AI-powered chat assistant that can help with
                job search strategies, resume tips, interview preparation, and more.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h3 className="font-semibold">What you'll get with Pro:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>200 AI chat messages per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Unlimited job applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => router.push('/pricing')} className="flex-1">
                <Zap className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
              <Button
                onClick={() => router.push('/app/jobs')}
                variant="outline"
                className="flex-1"
              >
                Back to Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Chat Interface (In Progress)
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Chat Assistant</h1>
          <p className="text-muted-foreground">
            Get personalized job search advice and support
          </p>
        </div>
        <Badge variant="outline">
          {usage?.chatMessages || 0} /{' '}
          {data?.config.features.chatMessagesPerMonth === 'unlimited'
            ? '∞'
            : data?.config.features.chatMessagesPerMonth}{' '}
          messages
        </Badge>
      </div>

      {/* Beta Notice */}
      <Alert>
        <MessageSquare className="h-4 w-4" />
        <AlertDescription>
          <strong>Feature In Progress:</strong> This chat feature is currently under
          development. The interface is ready, but AI integration is pending. Stay
          tuned!
        </AlertDescription>
      </Alert>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Chat
          </CardTitle>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-medium mb-2">Start a conversation</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Ask me anything about job searching, resume writing, interview
                  preparation, or career advice.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}
