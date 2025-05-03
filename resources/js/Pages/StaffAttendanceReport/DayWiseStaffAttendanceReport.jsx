import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DateWiseClassAttendanceReportInnerLayout from './Partials/DateWiseClassAttendanceReport/DateWiseClassAttendanceReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DateWiseClassAttendanceReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Date Wise Class Attendance Report</h2>}
        >
            <Head title="Date Wise Class Attendance Report" />
            <DateWiseClassAttendanceReportInnerLayout />
        </DashboardLayout>
    );
}
