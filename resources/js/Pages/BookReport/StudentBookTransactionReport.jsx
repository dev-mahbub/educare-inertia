import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentBookTransactionReportInnerLayout from './Partials/StudentBookTransactionReport/StudentBookTransactionReportInnerLayout';

export default function StudentBookTransactionReport({
    auth,
    siteData,
    studentIssuesBooks,
    studentReturnBooks,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">StudentBookTransactionReport</h2>}
        >
            <Head title="StudentBookTransactionReport" />

            <StudentBookTransactionReportInnerLayout
                studentIssuesBooks={studentIssuesBooks}
                studentReturnBooks={studentReturnBooks}
            />
        </DashboardLayout>
    );
}
