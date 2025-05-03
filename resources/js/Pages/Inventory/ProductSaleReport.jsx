import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ProductSaleReportInnerLayout from './Partials/InventoryReport/ProductSaleReport/ProductSaleReportInnerLayout';

export default function ProductSaleReport({
    auth,
    siteData,
    ledgerSummary,
    categories,
    products,
    partyTypes
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <ProductSaleReportInnerLayout
                ledgerSummary={ledgerSummary}
                categories={categories}
                products={products}
                partyTypes={partyTypes}
            />
        </DashboardLayout>
    );
}
