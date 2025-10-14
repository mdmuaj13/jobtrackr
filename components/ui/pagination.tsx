'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	pageSizeOptions?: number[];
	showPageSizeSelector?: boolean;
	itemName?: string;
}

export function Pagination({
	currentPage,
	pageSize,
	totalItems,
	totalPages,
	onPageChange,
	onPageSizeChange,
	pageSizeOptions = [10, 20, 30, 40, 50],
	showPageSizeSelector = true,
	itemName = 'items',
}: PaginationProps) {
	const startItem = Math.min(((currentPage - 1) * pageSize) + 1, totalItems);
	const endItem = Math.min(currentPage * pageSize, totalItems);

	const handlePageSizeChange = (value: string) => {
		onPageSizeChange(Number(value));
		onPageChange(1); // Reset to first page when changing page size
	};

	return (
		<div className="flex items-center justify-between py-4 border-t">
			{/* Items count - hidden on mobile */}
			<div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
				{totalItems > 0 ? (
					<>
						Showing {startItem} to {endItem} of {totalItems} {itemName}
					</>
				) : (
					`No ${itemName} found`
				)}
			</div>

			{/* Pagination controls */}
			<div className="flex w-full items-center gap-8 lg:w-fit">
				{/* Page size selector - hidden on mobile */}
				{showPageSizeSelector && (
					<div className="hidden items-center gap-2 lg:flex">
						<Label htmlFor="rows-per-page" className="text-sm font-medium">
							Rows per page
						</Label>
						<Select
							value={`${pageSize}`}
							onValueChange={handlePageSizeChange}
						>
							<SelectTrigger size="sm" className="w-20" id="rows-per-page">
								<SelectValue placeholder={pageSize} />
							</SelectTrigger>
							<SelectContent side="top">
								{pageSizeOptions.map((size) => (
									<SelectItem key={size} value={`${size}`}>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}

				{/* Page indicator */}
				<div className="flex w-fit items-center justify-center text-sm font-medium">
					Page {currentPage} of {totalPages || 1}
				</div>

				{/* Navigation buttons */}
				<div className="ml-auto flex items-center gap-2 lg:ml-0">
					{/* First page button - hidden on mobile */}
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => onPageChange(1)}
						disabled={currentPage === 1}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft className="h-4 w-4" />
					</Button>

					{/* Previous page button */}
					<Button
						variant="outline"
						className="size-8"
						size="icon"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					{/* Next page button */}
					<Button
						variant="outline"
						className="size-8"
						size="icon"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage >= totalPages}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight className="h-4 w-4" />
					</Button>

					{/* Last page button - hidden on mobile */}
					<Button
						variant="outline"
						className="hidden size-8 lg:flex"
						size="icon"
						onClick={() => onPageChange(totalPages)}
						disabled={currentPage >= totalPages}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
