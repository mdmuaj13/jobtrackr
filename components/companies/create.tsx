'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetClose,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { createCompany } from '@/hooks/companies';

interface FormData {
	name: string;
	industry: string;
	location: string;
	website: string;
	description: string;
	contact_email: string;
	contact_phone: string;
	logo_url: string;
}

interface CompanyFormProps {
	onSuccess?: () => void;
}

export function CompanyForm({ onSuccess }: CompanyFormProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		name: '',
		industry: '',
		location: '',
		website: '',
		description: '',
		contact_email: '',
		contact_phone: '',
		logo_url: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const submitData = {
				...formData,
				industry: formData.industry || undefined,
				location: formData.location || undefined,
				website: formData.website || undefined,
				description: formData.description || undefined,
				contact_email: formData.contact_email || undefined,
				contact_phone: formData.contact_phone || undefined,
				logo_url: formData.logo_url || undefined,
			};

			await createCompany(submitData);
			toast.success('Company created successfully');
			// Reset form
			setFormData({
				name: '',
				industry: '',
				location: '',
				website: '',
				description: '',
				contact_email: '',
				contact_phone: '',
				logo_url: '',
			});

			// Call success callback
			onSuccess?.();
			router.refresh();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Failed to create company'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-full space-y-6 p-4 py-8">
			<SheetHeader className="px-0">
				<SheetTitle>Create Company</SheetTitle>
				<SheetDescription>Add a new company to your system.</SheetDescription>
			</SheetHeader>

			<form onSubmit={handleSubmit} className="flex-1 space-y-4 py-4 overflow-y-auto">
				<div className="space-y-2">
					<Label htmlFor="name">Company Name *</Label>
					<Input
						id="name"
						name="name"
						placeholder="Enter company name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="industry">Industry</Label>
					<Input
						id="industry"
						name="industry"
						placeholder="e.g. Technology, Finance, Healthcare"
						value={formData.industry}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="location">Location</Label>
					<Input
						id="location"
						name="location"
						placeholder="Enter location"
						value={formData.location}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="website">Website</Label>
					<Input
						id="website"
						name="website"
						type="url"
						placeholder="https://example.com"
						value={formData.website}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="contact_email">Contact Email</Label>
					<Input
						id="contact_email"
						name="contact_email"
						type="email"
						placeholder="contact@company.com"
						value={formData.contact_email}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="contact_phone">Contact Phone</Label>
					<Input
						id="contact_phone"
						name="contact_phone"
						placeholder="Enter contact phone"
						value={formData.contact_phone}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="logo_url">Logo URL</Label>
					<Input
						id="logo_url"
						name="logo_url"
						type="url"
						placeholder="https://example.com/logo.png"
						value={formData.logo_url}
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Enter company description"
						value={formData.description}
						onChange={handleChange}
						rows={3}
						className="resize-none"
					/>
				</div>
			</form>

			<SheetFooter className="gap-2 px-0 mt-auto">
				<SheetClose asChild>
					<Button type="button" variant="outline" disabled={isLoading}>
						Cancel
					</Button>
				</SheetClose>
				<Button type="submit" disabled={isLoading} onClick={handleSubmit}>
					{isLoading ? 'Creating...' : 'Create Company'}
				</Button>
			</SheetFooter>
		</div>
	);
}
