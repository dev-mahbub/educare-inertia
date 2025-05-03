import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherBookTransactionReportInnerLayout from './Partials/TeacherBookTransactionReport/TeacherBookTransactionReportInnerLayout';

export default function TeacherBookTransactionReport({
    auth,
    siteData,
    teacherIssuesBook,
    teacherReturnBook,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">TeacherBookTransactionReport</h2>}
        >
            <Head title="TeacherBookTransactionReport" />

            <TeacherBookTransactionReportInnerLayout
                teacherIssuesBook={teacherIssuesBook}
                teacherReturnBook={teacherReturnBook}
            />
        </DashboardLayout>
    );
}
