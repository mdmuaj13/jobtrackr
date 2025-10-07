'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiCall } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<'form'>) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const data = await apiCall('/api/auth/forgot-password', {
				method: 'POST',
				body: JSON.stringify({ email }),
			});

			if (data.status_code === 200) {
				setSuccess(true);
				// In development, show the reset URL
				if (process.env.NODE_ENV === 'development' && data.data?.resetUrl) {
					console.log('Reset URL:', data.data.resetUrl);
				}
			} else {
				setError(data.message || 'Failed to send reset email');
			}
		} catch {
			setError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<div className={cn('flex flex-col gap-6', className)}>
				<div className="flex flex-col items-center gap-2 text-center">
					<div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mb-2">
						<svg
							className="w-8 h-8 text-green-600 dark:text-green-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h1 className="text-2xl font-bold">Check your email</h1>
					<p className="text-muted-foreground text-sm text-balance">
						If an account exists with <strong>{email}</strong>, you will receive
						a password reset link shortly.
					</p>
				</div>
				<Button asChild variant="outline" className="w-full">
					<Link href="/login" className="flex items-center gap-2">
						<ArrowLeft className="w-4 h-4" />
						Back to Login
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<form
			className={cn('flex flex-col gap-6', className)}
			onSubmit={handleSubmit}
			{...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Forgot your password?</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your email address and we&apos;ll send you a link to reset your
					password
				</p>
			</div>
			{error && (
				<div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded">
					{error}
				</div>
			)}
			<div className="grid gap-6">
				<div className="grid gap-3">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? 'Sending...' : 'Send reset link'}
				</Button>
			</div>
			<div className="text-center text-sm">
				<Link
					href="/login"
					className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground">
					<ArrowLeft className="w-4 h-4" />
					Back to Login
				</Link>
			</div>
		</form>
	);
}
