'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

interface JobChatInterfaceProps {
	jobId: string;
	jobTitle: string;
}

export function JobChatInterface({ jobId, jobTitle }: JobChatInterfaceProps) {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			role: 'assistant',
			content: `Hello! I'm here to help you with your job application for ${jobTitle}. I can assist with:\n\n• Writing cover letters\n• Preparing for interviews\n• Tailoring your resume\n• Understanding the job requirements\n• Application strategy\n\nHow can I help you today?`,
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		if (scrollAreaRef.current) {
			const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		}
	}, [messages]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: 'user',
			content: input.trim(),
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);

		// Simulate AI response (replace with actual API call)
		setTimeout(() => {
			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: `I understand you're asking about: "${userMessage.content}"\n\nThis is a placeholder response. In a production environment, this would connect to an AI service to provide intelligent assistance with your job application.`,
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, assistantMessage]);
			setIsLoading(false);
		}, 1000);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<div className="flex flex-col h-full bg-background border rounded-lg shadow-sm">
			{/* Header */}
			<div className="flex items-center gap-2 p-4 border-b">
				<Bot className="h-5 w-5 text-primary" />
				<div className="flex-1">
					<h3 className="font-semibold text-sm">AI Job Assistant</h3>
					<p className="text-xs text-muted-foreground">Powered by AI</p>
				</div>
			</div>

			{/* Messages */}
			<ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
				<div className="space-y-4">
					{messages.map((message) => (
						<div
							key={message.id}
							className={cn(
								'flex gap-3',
								message.role === 'user' ? 'justify-end' : 'justify-start'
							)}
						>
							{message.role === 'assistant' && (
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
									<Bot className="h-4 w-4 text-primary" />
								</div>
							)}
							<div
								className={cn(
									'rounded-lg px-4 py-2.5 max-w-[80%]',
									message.role === 'user'
										? 'bg-primary text-primary-foreground'
										: 'bg-muted'
								)}
							>
								<p className="text-sm whitespace-pre-wrap break-words">
									{message.content}
								</p>
								<p className="text-xs opacity-70 mt-1">
									{message.timestamp.toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</div>
							{message.role === 'user' && (
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
									<User className="h-4 w-4 text-primary-foreground" />
								</div>
							)}
						</div>
					))}
					{isLoading && (
						<div className="flex gap-3 justify-start">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
								<Bot className="h-4 w-4 text-primary" />
							</div>
							<div className="rounded-lg px-4 py-2.5 bg-muted">
								<div className="flex gap-1">
									<div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
									<div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
									<div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
								</div>
							</div>
						</div>
					)}
				</div>
			</ScrollArea>

			{/* Input */}
			<div className="p-4 border-t">
				<form onSubmit={handleSubmit} className="flex gap-2">
					<Textarea
						ref={textareaRef}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Ask me anything about this job application..."
						className="min-h-[60px] max-h-[120px] resize-none"
						disabled={isLoading}
					/>
					<Button
						type="submit"
						size="icon"
						disabled={!input.trim() || isLoading}
						className="h-[60px] w-[60px] flex-shrink-0"
					>
						<Send className="h-4 w-4" />
					</Button>
				</form>
				<p className="text-xs text-muted-foreground mt-2">
					Press Enter to send, Shift+Enter for new line
				</p>
			</div>
		</div>
	);
}
