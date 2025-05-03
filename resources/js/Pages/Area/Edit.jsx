import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditNewAreaInnerLayout from './Partials/Edit/EditNewAreaInnerLayout';

export default function Edit({
    auth,
    siteData,
    areas,
    area
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Area</h2>}
        >
            <Head title="Edit Area" />

            <EditNewAreaInnerLayout areas={areas} area={area} />
        </DashboardLayout>
    );
}
