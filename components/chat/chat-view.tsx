'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IconSend, IconSparkles } from '@tabler/icons-react';

interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

export function ChatView() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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
				content:
					'This is a placeholder response. Integrate with your AI service to get actual responses.',
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

	// If no messages, show the initial centered input
	if (messages.length === 0) {
		return (
			<div className="flex h-[calc(100vh-var(--header-height))] items-center justify-center p-8">
				<div className="w-full max-w-3xl space-y-8">
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4">
								<IconSparkles className="h-8 w-8 text-white" />
							</div>
						</div>
						<h1 className="text-4xl font-bold tracking-tight">
							How can I help you today?
						</h1>
						<p className="text-muted-foreground text-lg">
							Ask me anything about your job search, career advice, or general
							questions.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="relative">
						<Textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
							className="min-h-[120px] pr-12 resize-none text-base"
							autoFocus
						/>
						<Button
							type="submit"
							size="icon"
							disabled={!input.trim() || isLoading}
							className="absolute bottom-3 right-3 rounded-full h-10 w-10">
							<IconSend className="h-4 w-4" />
							<span className="sr-only">Send message</span>
						</Button>
					</form>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<button
							onClick={() =>
								setInput('Help me update my resume for a software engineer role')
							}
							className="p-4 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
							<div className="font-medium mb-1">Resume Help</div>
							<div className="text-sm text-muted-foreground">
								Get tips on updating your resume
							</div>
						</button>
						<button
							onClick={() =>
								setInput('What should I ask in a technical interview?')
							}
							className="p-4 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
							<div className="font-medium mb-1">Interview Prep</div>
							<div className="text-sm text-muted-foreground">
								Prepare for your next interview
							</div>
						</button>
						<button
							onClick={() =>
								setInput('How do I negotiate a job offer?')
							}
							className="p-4 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
							<div className="font-medium mb-1">Salary Negotiation</div>
							<div className="text-sm text-muted-foreground">
								Learn negotiation strategies
							</div>
						</button>
						<button
							onClick={() =>
								setInput('Tips for my first day at a new job')
							}
							className="p-4 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
							<div className="font-medium mb-1">Career Advice</div>
							<div className="text-sm text-muted-foreground">
								Get guidance for career growth
							</div>
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Chat conversation view
	return (
		<div className="flex flex-col h-[calc(100vh-var(--header-height))]">
			{/* Messages area */}
			<div className="flex-1 overflow-y-auto p-8">
				<div className="max-w-3xl mx-auto space-y-6">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex gap-4 ${
								message.role === 'user' ? 'justify-end' : 'justify-start'
							}`}>
							{message.role === 'assistant' && (
								<div className="flex-shrink-0">
									<div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-2">
										<IconSparkles className="h-4 w-4 text-white" />
									</div>
								</div>
							)}
							<div
								className={`rounded-lg px-4 py-3 max-w-[80%] ${
									message.role === 'user'
										? 'bg-primary text-primary-foreground'
										: 'bg-muted'
								}`}>
								<p className="whitespace-pre-wrap">{message.content}</p>
								<p className="text-xs opacity-70 mt-2">
									{message.timestamp.toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</div>
							{message.role === 'user' && (
								<div className="flex-shrink-0">
									<div className="rounded-full bg-primary p-2 h-8 w-8 flex items-center justify-center text-primary-foreground font-semibold text-sm">
										U
									</div>
								</div>
							)}
						</div>
					))}
					{isLoading && (
						<div className="flex gap-4 justify-start">
							<div className="flex-shrink-0">
								<div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-2">
									<IconSparkles className="h-4 w-4 text-white" />
								</div>
							</div>
							<div className="rounded-lg px-4 py-3 bg-muted">
								<div className="flex gap-1">
									<div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
									<div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
									<div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Input area */}
			<div className="border-t bg-background p-4">
				<div className="max-w-3xl mx-auto">
					<form onSubmit={handleSubmit} className="relative">
						<Textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
							className="min-h-[80px] pr-12 resize-none"
						/>
						<Button
							type="submit"
							size="icon"
							disabled={!input.trim() || isLoading}
							className="absolute bottom-3 right-3 rounded-full h-10 w-10">
							<IconSend className="h-4 w-4" />
							<span className="sr-only">Send message</span>
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
