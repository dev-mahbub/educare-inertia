import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SaleRegisterReportInnerLayout from './Partials/InventoryReport/SaleRegisterReport/SaleRegisterReportInnerLayout';

export default function SaleRegisterReport({
    auth,
    siteData,
    saleReport,
    ledgers,
    paymentModeSummary,
    takenBySummary
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <SaleRegisterReportInnerLayout
                saleReport={saleReport}
                ledgers={ledgers}
                paymentModeSummary={paymentModeSummary}
                takenBySummary={takenBySummary}
            />
        </DashboardLayout>
    );
}
