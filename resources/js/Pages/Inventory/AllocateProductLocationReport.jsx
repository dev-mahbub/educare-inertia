import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllocateProductLocationReportInnerLayout from './Partials/AssetAllocation/AllocateProductLocationReport/AllocateProductLocationReportInnerLayout';

export default function AllocateProductLocation({
    auth,
    siteData,
    productLocationReport,
    products,
    statusArray
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <AllocateProductLocationReportInnerLayout
                productLocationReport={productLocationReport}
                products={products}
                statusArray={statusArray}
            />
        </DashboardLayout>
    );
}
