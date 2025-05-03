import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ProductReturnInnerLayout from './Partials/InventoryAllocation/ProductReturn/ProductReturnInnerLayout';

export default function ProductReturn({
    auth,
    siteData,
    allocationStaffs,
    allocationProducts
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <ProductReturnInnerLayout
                allocationStaffs={allocationStaffs}
                allocationProducts={allocationProducts}
             />
        </DashboardLayout>
    );
}
