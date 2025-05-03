import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SaleGroupInnerLayout from './Partials/SaleGroup/SaleGroupInnerLayout';

export default function SaleGroup({
    auth,
    siteData,
    saleGroups,
    products,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <SaleGroupInnerLayout
                saleGroups={saleGroups}
                products={products}
            />
        </DashboardLayout>
    );
}
