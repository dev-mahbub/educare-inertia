import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllocationSummaryInnerLayout from './Partials/InventoryAllocation/AllocationSummary/AllocationSummaryInnerLayout';

export default function AllocationSummary({
    auth,
    siteData,
    allocationSummary
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <AllocationSummaryInnerLayout
                allocationSummary={allocationSummary}
            />
        </DashboardLayout>
    );
}
