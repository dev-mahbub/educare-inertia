import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DuePaidReportInnerLayout from './Partials/InventoryReport/DuePaidReport/DuePaidReportInnerLayout';

export default function DuePaidReport({
    auth,
    siteData,
    dueReportForStudent,
    paidReportForStudent,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <DuePaidReportInnerLayout
                dueReportForStudent={dueReportForStudent}
                paidReportForStudent={paidReportForStudent}
            />
        </DashboardLayout>
    );
}
