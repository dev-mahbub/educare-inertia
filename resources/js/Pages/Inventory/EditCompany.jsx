import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditCompanyInnerLayout from './Partials/Company/Edit/EditCompanyInnerLayout';

export default function EditCompany({
    auth,
    siteData,
    company,
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
            <EditCompanyInnerLayout
                company={company}
                companies={companies}
                search={search}
            />
        </DashboardLayout>
    );
}
