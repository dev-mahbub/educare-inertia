import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffWiseAttendanceReportInnerLayout from './Partials/StaffWiseAttendanceReport/StaffWiseAttendanceReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffWiseAttendanceReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Wise Attendance Report</h2>}
        >
            <Head title="Staff Wise Attendance Report" />

            <StaffWiseAttendanceReportInnerLayout />
        </DashboardLayout>
    );
}