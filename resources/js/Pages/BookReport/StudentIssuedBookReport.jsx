import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentIssuedBookReportInnerLayout from './Partials/StudentIssuedBookReport/StudentIssuedBookReportInnerLayout';

export default function StudentIssuedBookReport({
    auth,
    siteData,
    studentIssusBooks,
    classrooms,
    students,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student issued book report</h2>}
        >
            <Head title="StudentIssuedBookReport" />

            <StudentIssuedBookReportInnerLayout
                studentIssusBooks={studentIssusBooks}
                classrooms={classrooms}
                students={students}
            />
        </DashboardLayout>
    );
}
