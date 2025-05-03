import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateDesignationContactInnerLayout from './Partials/CreateDesignationContactInnerLayout';

export default function Show({ auth, siteData, designations}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Designation</h2>}
        >
            <Head title="Designation" />

            <CreateDesignationContactInnerLayout designations={designations}  />
        </DashboardLayout>
    );
}