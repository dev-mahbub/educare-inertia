import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherIssuedBookReportInnerLayout from './Partials/TeacherIssuedBookReport/TeacherIssuedBookReportInnerLayout';

export default function TeacherIssuedBookReport({
    auth,
    siteData,
    teacherIssuesBook,
    teacherData,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">TeacherIssuedBookReport</h2>}
        >
            <Head title="TeacherIssuedBookReport" />

            <TeacherIssuedBookReportInnerLayout
                teacherIssuesBook={teacherIssuesBook}
                teacherData={teacherData}
            />
        </DashboardLayout>
    );
}
