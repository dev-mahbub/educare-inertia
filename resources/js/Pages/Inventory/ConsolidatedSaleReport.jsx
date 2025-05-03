import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ConsolidatedSaleReportInnerLayout from './Partials/InventoryReport/ConsolidatedSaleReport/ConsolidatedSaleReportInnerLayout';

export default function ImportItem({
    auth,
    siteData,
    consolidatedSaleReport,
    consolidatedSaleSummary
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <ConsolidatedSaleReportInnerLayout
                consolidatedSaleReport={consolidatedSaleReport}
                consolidatedSaleSummary={consolidatedSaleSummary}
            />
        </DashboardLayout>
    );
}
