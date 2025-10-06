'use client';

import * as React from 'react';
import {
	IconDashboard,
	IconDatabase,
	IconFolder,
	IconBuildingCastle,
	IconListDetails,
	IconReport,
	IconSettings,
	IconUsers,
	IconShoppingCart,
	IconPackage,
	IconTruck,
	IconBuilding,
	IconFileInvoice,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/app/dashboard',
			icon: IconDashboard,
		},
		{
			title: 'Jobs',
			url: '/app/jobs',
			icon: IconBuildingCastle,
		},
		{
			title: 'Applications',
			url: '/app/applications',
			icon: IconFileInvoice,
		},
		{
			title: 'Companies',
			url: '/app/companies',
			icon: IconBuilding,
		},
		{
			title: 'Contacts',
			url: '/app/contacts',
			icon: IconUsers,
		},
		{
			title: 'Documents',
			url: '/app/documents',
			icon: IconFolder,
		},
		{
			title: 'Analytics',
			url: '/app/analytics',
			icon: IconReport,
		},
	],
	navClouds: [],
	navSecondary: [
		{
			title: 'Settings',
			url: '/app/settings',
			icon: IconSettings,
		},
	],
	documents: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5">
							<Link href="/app/dashboard">
								<IconBuildingCastle className="!size-5" />
								<span className="text-base font-semibold">JobTrackr</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
