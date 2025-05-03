import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentWiseBookReportInnerLayout from './Partials/StudentWiseBookReport/StudentWiseBookReportInnerLayout';

export default function StudentWiseBookReport({
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">StudentWiseBookReport</h2>}
        >
            <Head title="StudentWiseBookReport" />

            <StudentWiseBookReportInnerLayout
                studentIssusBooks={studentIssusBooks}
                classrooms={classrooms}
                students={students}
            />
        </DashboardLayout>
    );
}
