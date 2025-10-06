import { CompaniesList } from '@/components/companies/companies-list';

const CompaniesPage = () => {
	return (
		<div>
			<div className="flex-1 space-y-4 p-8 pt-6">
				<CompaniesList />
			</div>
		</div>
	);
};

export default CompaniesPage;
