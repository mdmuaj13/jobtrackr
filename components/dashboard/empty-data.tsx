import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
import { IconBox } from '@tabler/icons-react';
import { type ReactNode } from 'react';

interface EmptyDataProps {
	icon?: ReactNode;
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
	actionVariant?:
		| 'default'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| 'destructive';
	className?: string;
	mediaVariant?: 'default' | 'icon';
}

export function EmptyData({
	icon,
	title,
	description,
	actionLabel,
	onAction,
	actionVariant = 'outline',
	className = '',
	mediaVariant = 'icon',
}: EmptyDataProps) {
	return (
		<Empty className={className}>
			<EmptyHeader>
				<EmptyMedia variant={mediaVariant}>{icon || <IconBox />}</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				{description && <EmptyDescription>{description}</EmptyDescription>}
			</EmptyHeader>
			{actionLabel && onAction && (
				<EmptyContent>
					<Button variant={actionVariant} size="sm" onClick={onAction}>
						{actionLabel}
					</Button>
				</EmptyContent>
			)}
		</Empty>
	);
}
