import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import JournalReportInnerLayout from './Partials/JournalReport/JournalReportInnerLayout';

export default function JournalReport({
    auth,
    siteData,
    journals
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Journal Report</h2>}
        >
            <Head title="Journal Report" />
            <JournalReportInnerLayout
                journals={journals}
            />
        </DashboardLayout>
    );
}

