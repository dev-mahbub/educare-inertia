import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MonthWiseAttendanceReportInnerLayout from './Partials/MonthWiseAttendanceReport/MonthWiseAttendanceReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MonthWiseAttendanceReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Month Wise Attendance Report</h2>}
        >
            <Head title="Month Wise Attendance Report" />

            <MonthWiseAttendanceReportInnerLayout />
        </DashboardLayout>
    );
}