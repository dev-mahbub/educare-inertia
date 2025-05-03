import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ProductTransactionReportInnerLayout from './Partials/InventoryReport/ProductTransactionReport/ProductTransactionReportInnerLayout';

export default function ProductTransactionReport({
    auth,
    siteData,
    transactionPurchaseReport,
    sumOpeningStock,
    productNames,
    transactionSaleReport,
    availableStock
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <ProductTransactionReportInnerLayout
                transactionPurchaseReport={transactionPurchaseReport}
                sumOpeningStock={sumOpeningStock}
                productNames={productNames}
                transactionSaleReport={transactionSaleReport}
                availableStock={availableStock}
            />
        </DashboardLayout>
    );
}
