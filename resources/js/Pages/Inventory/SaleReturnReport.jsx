import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SaleReturnReportInnerLayout from './Partials/InventoryReport/SaleReturnReport/SaleReturnReportInnerLayout';

export default function SaleReturnReport({ auth, siteData, saleReturnReport }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <SaleReturnReportInnerLayout
                saleReturnReport={saleReturnReport}
            />
        </DashboardLayout>
    );
}
