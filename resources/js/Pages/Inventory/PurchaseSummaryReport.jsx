import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PurchaseSummaryReportInnerLayout from './Partials/InventoryReport/PurchaseSummaryReport/PurchaseSummaryReportInnerLayout';

export default function PurchaseSummaryReport({
    auth,
    siteData,
    purchaseSummaryReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <PurchaseSummaryReportInnerLayout
                purchaseSummaryReport={purchaseSummaryReport}
            />
        </DashboardLayout>
    );
}
