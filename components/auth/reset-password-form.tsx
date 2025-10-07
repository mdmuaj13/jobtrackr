'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiCall } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ResetPasswordFormProps extends React.ComponentProps<'form'> {
	token: string;
}

export function ResetPasswordForm({
	token,
	className,
	...props
}: ResetPasswordFormProps) {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			setLoading(false);
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			setLoading(false);
			return;
		}

		try {
			const data = await apiCall('/api/auth/reset-password', {
				method: 'POST',
				body: JSON.stringify({ token, password }),
			});

			if (data.status_code === 200) {
				setSuccess(true);
				setTimeout(() => {
					router.push('/login');
				}, 2000);
			} else {
				setError(data.message || 'Failed to reset password');
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
					<h1 className="text-2xl font-bold">Password reset successful!</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Your password has been reset. Redirecting to login...
					</p>
				</div>
			</div>
		);
	}

	return (
		<form
			className={cn('flex flex-col gap-6', className)}
			onSubmit={handleSubmit}
			{...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Set new password</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your new password below
				</p>
			</div>
			{error && (
				<div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded">
					{error}
				</div>
			)}
			<div className="grid gap-6">
				<div className="grid gap-3">
					<Label htmlFor="password">New Password</Label>
					<Input
						id="password"
						type="password"
						placeholder="Enter new password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength={6}
					/>
				</div>
				<div className="grid gap-3">
					<Label htmlFor="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						type="password"
						placeholder="Confirm new password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						minLength={6}
					/>
				</div>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? 'Resetting...' : 'Reset password'}
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
