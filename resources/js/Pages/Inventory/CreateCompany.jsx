import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateCompanyInnerLayout from './Partials/Company/Create/CreateCompanyInnerLayout';

export default function CreateCompany({
    auth,
    siteData,
    companies,
    search,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CreateCompanyInnerLayout
                companies={companies}
                search={search}
            />
        </DashboardLayout>
    );
}
