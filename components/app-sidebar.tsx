'use client';

import * as React from 'react';
import {
	IconDashboard,
	IconFolder,
	IconBuildingCastle,
	IconSettings,
	IconBuilding,
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
			url: '/app',
			icon: IconDashboard,
		},
		{
			title: 'Jobs',
			url: '/app/jobs',
			icon: IconBuildingCastle,
		},
		{
			title: 'Documents',
			url: '/app/documents',
			icon: IconFolder,
		},
		{
			title: 'Companies',
			url: '/app/companies',
			icon: IconBuilding,
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
							<Link href="/app">
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
