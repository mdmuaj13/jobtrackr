'use client';

import { IconDotsVertical, IconLogout, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/store';

export function NavUser() {
	const { isMobile } = useSidebar();
	const { logout, user } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="cursor-pointer hover:bg-sidebar-accent/50 transition-colors data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<Avatar className="h-8 w-8 rounded-lg grayscale">
								<AvatarImage
									src={user?.image || undefined}
									alt={user?.name || ''}
								/>
								<AvatarFallback className="rounded-lg">
									{user?.name?.[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{`${user?.name}`}</span>
								<span className="text-muted-foreground truncate text-xs">
									{user?.email}
								</span>
							</div>
							<IconDotsVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}>
						<DropdownMenuLabel className="p-0 font-normal">
							<Link href="/app/profile" className="cursor-pointer">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm rounded-md hover:bg-accent transition-colors">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage
											src={user?.image || undefined}
											alt={user?.name || ''}
										/>
										<AvatarFallback className="rounded-lg">
											{user?.name?.[0].toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{`${user?.name}`}</span>
										<span className="text-muted-foreground truncate text-xs">
											{user?.email}
										</span>
									</div>
								</div>
							</Link>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{/* <DropdownMenuItem asChild>
							<Link href="/app/profile">
								<IconUser />
								Profile
							</Link>
						</DropdownMenuItem> */}
						<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
							<IconLogout />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
