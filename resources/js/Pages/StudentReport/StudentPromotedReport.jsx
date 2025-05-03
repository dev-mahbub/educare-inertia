import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentPromotedReportInnerLayout from './Partials/StudentPromotedReport/StudentPromotedReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentPromotedReport({ auth, siteData, students, classrooms }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Promoted Report</h2>}
        >
            <Head title="Student Promoted Report" />

            <StudentPromotedReportInnerLayout
                students={students}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
