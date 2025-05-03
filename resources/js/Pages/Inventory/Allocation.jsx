import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllocationInnerLayout from './Partials/InventoryAllocation/Allocation/AllocationInnerLayout';

export default function Allocation({
    auth,
    siteData,
    staffNames,
    products,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <AllocationInnerLayout
                staffNames={staffNames}
                products={products}
            />
        </DashboardLayout>
    );
}

