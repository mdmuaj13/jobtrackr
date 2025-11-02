import { Briefcase, Sparkles } from 'lucide-react';

import { LoginForm } from '@/components/login-form';
import GuestGuard from '@/components/guest-guard';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="bg-muted relative hidden lg:block">
			<Image
				src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop"
				alt="Job Search Workspace"
				className="object-cover"
				fill
			/>
			<div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-gray-900/90 mix-blend-multiply"></div>
			<div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
				<div className="space-y-6 max-w-md">
					<div className="flex items-center gap-3">
						<div className="relative">
							<Briefcase className="h-12 w-12" />
							<Sparkles className="h-6 w-6 absolute -top-1 -right-1" />
						</div>
						<h1 className="text-4xl font-bold">JobApplicate</h1>
					</div>
					<h2 className="text-3xl font-semibold leading-tight">
						Welcome back to your job search journey
					</h2>
					<p className="text-lg text-blue-100">
						Track applications, prepare for interviews, and land your dream job with AI-powered insights.
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
                JobApplicate
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
	);
}
