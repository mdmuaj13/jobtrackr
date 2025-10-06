'use client';

import { deleteCompany } from '@/hooks/companies';
import { EntityView } from '@/components/ui/entity-view';
import { ViewField, formatDate } from '@/components/ui/view-field';

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

interface CompanyViewProps {
	company: Company;
	onEdit?: () => void;
	onDelete?: () => void;
	onSuccess?: () => void;
}

export function CompanyView({
	company,
	onEdit,
	onDelete,
	onSuccess,
}: CompanyViewProps) {
	return (
		<EntityView
			title="Company Details"
			description="View company information and manage actions."
			entity={company}
			entityName="Company"
			getEntityDisplayName={(c) => c.name}
			onEdit={onEdit}
			onDelete={onDelete}
			onSuccess={onSuccess}
			deleteFunction={deleteCompany}>
			<ViewField
				label="Company Name"
				value={<p className="text-sm">{company.name}</p>}
			/>

			<ViewField
				label="Industry"
				value={<p className="text-sm">{company.industry || 'Not provided'}</p>}
			/>

			<ViewField
				label="Location"
				value={<p className="text-sm">{company.location || 'Not provided'}</p>}
			/>

			<ViewField
				label="Website"
				value={
					company.website ? (
						<a
							href={company.website}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 hover:underline">
							{company.website}
						</a>
					) : (
						<p className="text-sm">Not provided</p>
					)
				}
			/>

			<ViewField
				label="Contact Email"
				value={
					company.contact_email ? (
						<a
							href={`mailto:${company.contact_email}`}
							className="text-sm text-blue-600 hover:underline">
							{company.contact_email}
						</a>
					) : (
						<p className="text-sm">Not provided</p>
					)
				}
			/>

			<ViewField
				label="Contact Phone"
				value={<p className="text-sm">{company.contact_phone || 'Not provided'}</p>}
			/>

			<ViewField
				label="Logo URL"
				value={
					company.logo_url ? (
						<a
							href={company.logo_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 hover:underline">
							{company.logo_url}
						</a>
					) : (
						<p className="text-sm">Not provided</p>
					)
				}
			/>

			<ViewField
				label="Description"
				value={
					<p className="text-sm whitespace-pre-wrap">
						{company.description || 'No description'}
					</p>
				}
			/>

			<div className="grid grid-cols-2 gap-4">
				<ViewField
					label="Created"
					value={<p className="text-sm">{formatDate(company.createdAt)}</p>}
				/>

				<ViewField
					label="Last Updated"
					value={<p className="text-sm">{formatDate(company.updatedAt)}</p>}
				/>
			</div>
		</EntityView>
	);
}
