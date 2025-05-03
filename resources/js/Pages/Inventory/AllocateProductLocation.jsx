import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllocateProductLocationInnerLayout from './Partials/AssetAllocation/AllocateProductLocation/AllocateProductLocationInnerLayout';

export default function AllocateProductLocation({
    auth,
    siteData,
    products,
    infraLevels
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <AllocateProductLocationInnerLayout
                products={products}
                infraLevels={infraLevels}
            />
        </DashboardLayout>
    );
}
