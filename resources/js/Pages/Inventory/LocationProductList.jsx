import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LocationProductListInnerLayout from './Partials/AssetAllocation/LocationProductList/LocationProductListInnerLayout';

export default function AllocateProductLocation({
    auth,
    siteData,
    locationWiseProductReport,
    infraLevels,
    statusArray
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <LocationProductListInnerLayout
                locationWiseProductReport={locationWiseProductReport}
                infraLevels={infraLevels}
                statusArray={statusArray}
            />
        </DashboardLayout>
    );
}
