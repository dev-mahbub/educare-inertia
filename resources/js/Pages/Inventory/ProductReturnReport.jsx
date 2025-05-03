import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllocationReturnReportInnerLayout from './Partials/InventoryAllocation/ProductReturnReport/AllocationReturnReportInnerLayout';

export default function ProductReturnReport({
    auth,
    siteData,
    allocationReturnProducts,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <AllocationReturnReportInnerLayout
                allocationReturnProducts={allocationReturnProducts}
            />
        </DashboardLayout>
    );
}
