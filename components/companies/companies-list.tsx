'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plus } from 'lucide-react';
import { useCompanies, deleteCompany } from '@/hooks/companies';
import { CompanyForm } from './create';
import { CompanyEditForm } from './edit-form';
import { CompanyView } from './view';
import { toast } from 'sonner';
import { SimpleTable } from '@/components/simple-table';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Spinner } from '../ui/shadcn-io/spinner';

interface Company {
	_id: string;
	name: string;
	industry?: string;
	location?: string;
	website?: string;
	description?: string;
	contact_email?: string;
	contact_phone?: string;
	logo_url?: string;
	createdAt: string;
	updatedAt: string;
}

export function CompaniesList() {
	const [createSheetOpen, setCreateSheetOpen] = useState(false);
	const [editSheetOpen, setEditSheetOpen] = useState(false);
	const [viewSheetOpen, setViewSheetOpen] = useState(false);
	const [editingCompany, setEditingCompany] = useState<Company | null>(null);
	const [viewingCompany, setViewingCompany] = useState<Company | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingCompany, setDeletingCompany] = useState<Company | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const {
		data: companiesData,
		error,
		mutate: mutateCompanies,
	} = useCompanies({
		page: 1,
		limit: 10,
	});

	const companies = companiesData?.data || [];
	const meta = companiesData?.meta;

	const handleDeleteClick = (company: Company) => {
		setDeletingCompany(company);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!deletingCompany) return;

		setIsDeleting(true);
		try {
			await deleteCompany(deletingCompany._id);
			toast.success('Company deleted successfully');
			mutateCompanies();
		} catch {
			toast.error('Failed to delete company');
		} finally {
			setIsDeleting(false);
			setDeleteDialogOpen(false);
			setDeletingCompany(null);
		}
	};

	const handleViewCompany = (company: Company) => {
		setViewingCompany(company);
		setViewSheetOpen(true);
	};

	const handleEditCompany = (company: Company) => {
		setEditingCompany(company);
		setEditSheetOpen(true);
	};

	const handleViewToEdit = () => {
		if (viewingCompany) {
			setViewSheetOpen(false);
			setEditingCompany(viewingCompany);
			setEditSheetOpen(true);
		}
	};

	const handleViewToDelete = () => {
		setViewSheetOpen(false);
		mutateCompanies();
	};

	const handleCreateSuccess = () => {
		setCreateSheetOpen(false);
		mutateCompanies();
	};

	const handleEditSuccess = () => {
		setEditSheetOpen(false);
		setEditingCompany(null);
		mutateCompanies();
	};

	const handleViewSuccess = () => {
		setViewSheetOpen(false);
		setViewingCompany(null);
		mutateCompanies();
	};

	const columns = [
		{
			key: 'name',
			header: 'Name',
		},
		{
			key: 'industry',
			header: 'Industry',
			render: (value: unknown) => (
				<span className="max-w-xs truncate block">
					{value ? String(value) : '-'}
				</span>
			),
		},
		{
			key: 'location',
			header: 'Location',
			render: (value: unknown) => (
				<span className="max-w-xs truncate block">
					{value ? String(value) : '-'}
				</span>
			),
		},
		{
			key: 'contact_email',
			header: 'Email',
			render: (value: unknown) => (
				<span className="max-w-xs truncate block">
					{value ? String(value) : '-'}
				</span>
			),
		},
		{
			key: 'createdAt',
			header: 'Created',
			render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
		},
	];

	const actions = [
		{
			label: 'View',
			onClick: (company: Company) => {
				handleViewCompany(company);
			},
			variant: 'secondary' as const,
		},
		{
			label: 'Edit',
			onClick: (company: Company) => handleEditCompany(company),
			variant: 'outline' as const,
		},
		{
			label: 'Delete',
			onClick: (company: Company) => handleDeleteClick(company),
			variant: 'destructive' as const,
		},
	];

	if (error) {
		return (
			<Card>
				<CardContent className="p-6">
					<p className="text-center text-red-500">Failed to load companies</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Companies ({meta?.total || 0})</h1>
				<div className="flex items-center gap-2">
					<Sheet open={createSheetOpen} onOpenChange={setCreateSheetOpen}>
						<SheetTrigger asChild>
							<Button>
								<Plus className="h-4 w-4 mr-2" />
								Add Company
							</Button>
						</SheetTrigger>
						<SheetContent>
							<div className="h-full">
								<CompanyForm onSuccess={handleCreateSuccess} />
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			{/* Companies Table */}
			<Card>
				<CardContent>
					{!companiesData && !error ? (
						<div className="flex items-center justify-center py-8">
							<Spinner variant="pinwheel" />
						</div>
					) : companies.length === 0 ? (
						<div className="flex items-center justify-center py-8">
							<p>No companies found</p>
						</div>
					) : (
						<SimpleTable
							data={companies}
							columns={columns}
							actions={actions}
							showPagination={false}
						/>
					)}
				</CardContent>
			</Card>

			{/* View Sheet */}
			<Sheet open={viewSheetOpen} onOpenChange={setViewSheetOpen}>
				<SheetContent>
					<div className="h-full">
						{viewingCompany && (
							<CompanyView
								company={viewingCompany}
								onEdit={handleViewToEdit}
								onDelete={handleViewToDelete}
								onSuccess={handleViewSuccess}
							/>
						)}
					</div>
				</SheetContent>
			</Sheet>

			{/* Edit Sheet */}
			<Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
				<SheetContent>
					<div className="h-full">
						{editingCompany && (
							<CompanyEditForm
								company={editingCompany}
								onSuccess={handleEditSuccess}
							/>
						)}
					</div>
				</SheetContent>
			</Sheet>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				title="Delete Company"
				description={`Are you sure you want to delete "${deletingCompany?.name}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
				isLoading={isDeleting}
			/>
		</div>
	);
}
