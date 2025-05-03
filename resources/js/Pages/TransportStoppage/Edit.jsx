import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditStoppageInnerLayout from './Partials/Edit/EditStoppageInnerLayout';

export default function Edit({
    auth,
    siteData,
    transport,
    areas,
    routes,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Stoppage</h2>}
        >
            <Head title="Edit Stoppage" />

            <EditStoppageInnerLayout
                transport={transport}
                areas={areas}
                routes={routes}
            />
        </DashboardLayout>
    );
}
