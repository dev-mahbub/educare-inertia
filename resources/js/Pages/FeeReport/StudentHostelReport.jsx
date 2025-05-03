import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentHostleReportInnerLayout from './Partials/StudentHostleReport/StudentHostleReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentHostelReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Hostel Report</h2>}
        >
            <Head title="Student Hostel Report" />

            <StudentHostleReportInnerLayout />
        </DashboardLayout>
    );
}
