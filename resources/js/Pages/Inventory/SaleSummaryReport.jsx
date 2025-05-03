import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SaleSummaryReportInnerLayout from './Partials/InventoryReport/SaleSummaryReport/SaleSummaryReportInnerLayout';

export default function SaleSummaryReport({
    auth,
    siteData,
    saleSummaryReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <SaleSummaryReportInnerLayout
                saleSummaryReport={saleSummaryReport}
            />
        </DashboardLayout>
    );
}
