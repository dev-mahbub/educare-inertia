import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditSaleGroupInnerLayout from './Partials/SaleGroup/EditSaleGroupInnerLayout';

export default function EditSaleGroup({
    auth,
    siteData,
    saleGroups,
    products,
    saleGroup,
    saleGroupProducts,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <EditSaleGroupInnerLayout
                saleGroups={saleGroups}
                products={products}
                saleGroup={saleGroup}
                saleGroupProducts={saleGroupProducts}
            />
        </DashboardLayout>
    );
}
