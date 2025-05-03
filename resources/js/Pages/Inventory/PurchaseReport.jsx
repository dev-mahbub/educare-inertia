import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PurchaseReportListInnerLayout from './Partials/InventoryReport/PurchaseReport/PurchaseReportListInnerLayout';

export default function PurchaseReport({
    auth,
    siteData,
    purchaseReport,
    partyAccountNames,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <PurchaseReportListInnerLayout
                purchaseReport={purchaseReport}
                partyAccountNames={partyAccountNames}
            />
        </DashboardLayout>
    );
}
