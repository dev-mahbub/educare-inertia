import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentAgeReportInnerLayout from './Partials/StudentAgeReport/StudentAgeReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentAgeReport({ auth, siteData, studentData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Age Report</h2>}
        >
            <Head title="Student Age Report" />

            <StudentAgeReportInnerLayout
                studentData={studentData}
            />
        </DashboardLayout>
    );
}
