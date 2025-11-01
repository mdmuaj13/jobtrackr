'use client';

import * as React from 'react';
import {
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
} from '@tabler/icons-react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface Action<T = unknown> {
	label: string;
	onClick: (row: T) => void;
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link';
	size?: 'default' | 'sm' | 'lg' | 'icon';
	disabled?: (row: T) => boolean;
	show?: (row: T) => boolean;
	loading?: (row: T) => boolean;
}

interface Column<T = unknown> {
	key: string;
	header: string;
	sortable?: boolean;
	render?: (value: unknown, row: T) => React.ReactNode;
}

interface SimpleTableProps<T = unknown> {
	data: T[];
	columns: Column<T>[];
	actions?: Action<T>[];
	showPagination?: boolean;
	pageSize?: number;
	onRowClick?: (row: T) => void;
}

export function SimpleTable<T = unknown>({
	data,
	columns,
	actions,
	showPagination = true,
	pageSize = 10,
	onRowClick,
}: SimpleTableProps<T>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize,
	});

	const tableColumns: ColumnDef<T>[] = React.useMemo(() => {
		const cols: ColumnDef<T>[] = columns.map((col) => ({
			accessorKey: col.key,
			header: col.header,
			cell: ({
				row,
				getValue,
			}: {
				row: { original: T };
				getValue: () => unknown;
			}) => {
				const value = getValue();
				return col.render
					? col.render(value, row.original)
					: String(value || '');
			},
			enableSorting: col.sortable ?? true,
		}));

		if (actions && actions.length > 0) {
			cols.push({
				id: 'actions',
				header: 'Actions',
				cell: ({ row }: { row: { original: T } }) => (
					<div className="flex items-center gap-2 justify-start">
						{actions
							.filter((action) => !action.show || action.show(row.original))
							.map((action, index) => {
								const isLoading = action.loading
									? action.loading(row.original)
									: false;
								return (
									<Button
										key={index}
										variant={action.variant || 'ghost'}
										size={action.size || 'sm'}
										onClick={() => action.onClick(row.original)}
										disabled={
											isLoading ||
											(action.disabled ? action.disabled(row.original) : false)
										}
										className={
											action.variant === 'destructive'
												? 'transition-colors'
												: 'hover:bg-muted/60 transition-colors'
										}>
										{isLoading ? 'Loading...' : action.label}
									</Button>
								);
							})}
					</div>
				),
				enableSorting: false,
			});
		}

		return cols;
	}, [columns, actions]);

	const table = useReactTable({
		data,
		columns: tableColumns,
		state: {
			sorting,
			pagination,
		},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="w-full flex flex-col gap-6">
			<div className="rounded-xl border-2 border-border/40 bg-card shadow-sm overflow-hidden hover:border-primary/20 transition-colors">
				<Table className="w-full">
					<TableHeader className="bg-muted/30 border-b-2 border-border/40">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-transparent">
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										className="relative font-semibold text-foreground/80 text-sm py-3 px-4 first:pl-6 last:pr-6 border-r border-border/40 last:border-r-0 select-none whitespace-nowrap">
										<div className="flex items-center">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</div>
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row, index) => (
								<TableRow
									key={row.id || index}
									className={`border-b border-border/30 last:border-0 hover:bg-gradient-to-r hover:from-chart-1/10 hover:to-transparent transition-all duration-200 ${
										onRowClick ? 'cursor-pointer' : ''
									}`}
									onClick={
										onRowClick ? () => onRowClick(row.original) : undefined
									}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="py-3 px-4 first:pl-6 last:pr-6 text-sm border-r border-border/40 last:border-r-0"
											onClick={(e) => {
												// Prevent row click when clicking on action buttons
												if (
													cell.column.id === 'actions' &&
													e.target instanceof HTMLElement &&
													(e.target.closest('button') ||
														e.target.tagName === 'BUTTON')
												) {
													e.stopPropagation();
												}
											}}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow className="hover:bg-transparent">
								<TableCell
									colSpan={tableColumns.length}
									className="h-32 text-center text-muted-foreground text-sm py-8">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{showPagination && table.getPageCount() > 1 && (
				<div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
					<div className="text-muted-foreground text-xs font-medium">
						Showing {table.getRowModel().rows.length} of {data.length} results
					</div>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
						<div className="hidden items-center gap-3 sm:flex">
							<Label
								htmlFor="rows-per-page"
								className="text-xs font-medium text-muted-foreground">
								Rows per page
							</Label>
							<Select
								value={`${table.getState().pagination.pageSize}`}
								onValueChange={(value) => {
									table.setPageSize(Number(value));
								}}>
								<SelectTrigger
									size="sm"
									className="w-20 h-8 border-border/40 hover:bg-muted/20 transition-colors"
									id="rows-per-page">
									<SelectValue />
								</SelectTrigger>
								<SelectContent side="top">
									{[10, 20, 30, 40, 50].map((size) => (
										<SelectItem key={size} value={`${size}`}>
											{size}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-center text-xs font-medium text-muted-foreground">
							Page {table.getState().pagination.pageIndex + 1} of{' '}
							{table.getPageCount()}
						</div>
						<div className="flex items-center justify-center gap-1">
							<Button
								variant="ghost"
								className="hidden h-8 w-8 p-0 sm:flex hover:bg-muted/40 transition-colors"
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}>
								<span className="sr-only">Go to first page</span>
								<IconChevronsLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								className="h-8 w-8 p-0 hover:bg-muted/40 transition-colors"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}>
								<span className="sr-only">Go to previous page</span>
								<IconChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								className="h-8 w-8 p-0 hover:bg-muted/40 transition-colors"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}>
								<span className="sr-only">Go to next page</span>
								<IconChevronRight className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								className="hidden h-8 w-8 p-0 sm:flex hover:bg-muted/40 transition-colors"
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={!table.getCanNextPage()}>
								<span className="sr-only">Go to last page</span>
								<IconChevronsRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
