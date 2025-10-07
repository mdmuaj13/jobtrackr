import { Briefcase, Sparkles } from 'lucide-react';

import { ResetPasswordForm } from '@/components/reset-password-form';
import GuestGuard from '@/components/guest-guard';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPasswordPage({
	searchParams,
}: {
	searchParams: { token?: string };
}) {
	const token = searchParams.token;

	if (!token) {
		return (
			<GuestGuard>
				<div className="flex min-h-screen items-center justify-center p-6">
					<div className="w-full max-w-md space-y-6 text-center">
						<div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-fit mx-auto">
							<svg
								className="w-8 h-8 text-red-600 dark:text-red-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
						<h1 className="text-2xl font-bold">Invalid Reset Link</h1>
						<p className="text-muted-foreground">
							This password reset link is invalid or has expired. Please request
							a new one.
						</p>
						<Link
							href="/forgot-password"
							className="inline-block text-blue-600 hover:underline">
							Request new reset link
						</Link>
					</div>
				</div>
			</GuestGuard>
		);
	}

	return (
		<GuestGuard>
			<div className="grid min-h-svh lg:grid-cols-2">
				<div className="bg-muted relative hidden lg:block">
					<Image
						src="https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1470&auto=format&fit=crop"
						alt="New Beginning"
						className="object-cover"
						fill
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-900/90 mix-blend-multiply"></div>
					<div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
						<div className="space-y-6 max-w-md">
							<div className="flex items-center gap-3">
								<div className="relative">
									<Briefcase className="h-12 w-12" />
									<Sparkles className="h-6 w-6 absolute -top-1 -right-1" />
								</div>
								<h1 className="text-4xl font-bold">JobTrackr</h1>
							</div>
							<h2 className="text-3xl font-semibold leading-tight">
								Choose a strong password
							</h2>
							<p className="text-lg text-blue-100">
								Create a secure password to protect your account and continue
								your job search journey.
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 p-6 md:p-10">
					<div className="flex justify-center gap-2 md:justify-start">
						<Link href="/" className="flex items-center gap-2 font-medium">
							<div className="relative">
								<div className="bg-blue-600 text-white flex size-8 items-center justify-center rounded-md">
									<Briefcase className="size-5" />
								</div>
								<Sparkles className="h-4 w-4 text-blue-500 absolute -top-1 -right-1" />
							</div>
							<span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
								JobTrackr
							</span>
						</Link>
					</div>
					<div className="flex flex-1 items-center justify-center">
						<div className="w-full max-w-xs">
							<ResetPasswordForm token={token} />
						</div>
					</div>
				</div>
			</div>
		</GuestGuard>
	);
}
