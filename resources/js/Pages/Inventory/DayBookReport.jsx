import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DayBookReportInnerLayout from './Partials/AccountReport/DayBookReport/DayBookReportInnerLayout';

export default function ImportItem({
    auth,
    siteData,
    dayBookReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <DayBookReportInnerLayout
                dayBookReport={dayBookReport}
            />
        </DashboardLayout>
    );
}
