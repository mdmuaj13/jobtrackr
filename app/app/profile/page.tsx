/**
 * User Profile Page
 * Displays and allows editing of user profile information
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/store';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { User, Mail, Calendar, Shield, Loader2 } from 'lucide-react';

interface ProfileData {
	name: string;
	email: string;
	role: string;
	image?: string;
	createdAt?: string;
}

export default function ProfilePage() {
	const { user, login } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [profileData, setProfileData] = useState<ProfileData>({
		name: user?.name || '',
		email: user?.email || '',
		role: user?.role || '',
		image: user?.image || '',
	});

	useEffect(() => {
		if (user) {
			setProfileData({
				name: user.name,
				email: user.email,
				role: user.role,
				image: user.image,
			});
		}
	}, [user]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			const token = useAuthStore.getState().token;
			if (!token) {
				toast.error('You are not authenticated');
				setSaving(false);
				return;
			}

			const response = await fetch('/api/profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					name: profileData.name,
					image: profileData.image,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Update the auth store with new user data
				login(
					{
						id: user?.id || '',
						name: data.data.name,
						email: data.data.email,
						role: data.data.role,
						image: data.data.image,
					},
					token
				);
				toast.success('Profile updated successfully');
			} else {
				toast.error(data.error || 'Failed to update profile');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			toast.error('An error occurred while updating profile');
		} finally {
			setSaving(false);
		}
	};

	const formatDate = (dateString?: string) => {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<div className="container mx-auto py-8 px-4 max-w-4xl">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-foreground">Profile</h1>
				<p className="text-muted-foreground mt-2">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="grid gap-6">
				{/* Profile Information Card */}
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
						<CardDescription>
							Update your personal information and profile picture
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Avatar Section */}
							<div className="flex items-center gap-6">
								<Avatar className="h-24 w-24">
									<AvatarImage
										src={profileData.image || undefined}
										alt={profileData.name}
									/>
									<AvatarFallback className="text-2xl">
										{profileData.name?.[0]?.toUpperCase() || 'U'}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<Label htmlFor="image">Profile Picture URL</Label>
									<Input
										id="image"
										name="image"
										type="url"
										placeholder="https://example.com/avatar.jpg"
										value={profileData.image || ''}
										onChange={handleInputChange}
										className="mt-2"
									/>
									<p className="text-xs text-muted-foreground mt-1">
										Enter a URL to your profile picture
									</p>
								</div>
							</div>

							<Separator />

							{/* Name Field */}
							<div className="space-y-2">
								<Label htmlFor="name">
									<User className="h-4 w-4 inline mr-2" />
									Full Name
								</Label>
								<Input
									id="name"
									name="name"
									type="text"
									placeholder="Enter your full name"
									value={profileData.name}
									onChange={handleInputChange}
									required
								/>
							</div>

							{/* Email Field (Read-only) */}
							<div className="space-y-2">
								<Label htmlFor="email">
									<Mail className="h-4 w-4 inline mr-2" />
									Email Address
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={profileData.email}
									disabled
									className="bg-muted cursor-not-allowed"
								/>
								<p className="text-xs text-muted-foreground">
									Email cannot be changed
								</p>
							</div>

							{/* Role Field (Read-only) */}
							<div className="space-y-2">
								<Label htmlFor="role">
									<Shield className="h-4 w-4 inline mr-2" />
									Role
								</Label>
								<Input
									id="role"
									name="role"
									type="text"
									value={profileData.role}
									disabled
									className="bg-muted cursor-not-allowed capitalize"
								/>
							</div>

							<div className="flex justify-end">
								<Button type="submit" disabled={saving}>
									{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
									{saving ? 'Saving...' : 'Save Changes'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>

				{/* Account Information Card */}
				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
						<CardDescription>
							View your account details and statistics
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-1">
								<div className="flex items-center text-sm text-muted-foreground">
									<Calendar className="h-4 w-4 mr-2" />
									Member Since
								</div>
								<p className="text-sm font-medium">
									{formatDate(user?.createdAt)}
								</p>
							</div>
							<div className="space-y-1">
								<div className="flex items-center text-sm text-muted-foreground">
									<User className="h-4 w-4 mr-2" />
									User ID
								</div>
								<p className="text-sm font-mono">{user?.id || 'N/A'}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Security Card */}
				<Card>
					<CardHeader>
						<CardTitle>Security</CardTitle>
						<CardDescription>
							Manage your password and security settings
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Password</p>
									<p className="text-sm text-muted-foreground">
										Last changed: Never or Unknown
									</p>
								</div>
								<Button variant="outline" disabled>
									Change Password
								</Button>
							</div>
							<p className="text-xs text-muted-foreground">
								Password change feature coming soon
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
