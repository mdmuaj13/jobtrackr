import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
	console.warn(
		'⚠️ RESEND_API_KEY not found in environment variables. Email sending will fail.'
	);
}

export const resend = new Resend(RESEND_API_KEY);

// Default sender email - should be verified in Resend
export const DEFAULT_FROM_EMAIL =
	process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

// Application base URL for generating links
export const APP_BASE_URL =
	process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
