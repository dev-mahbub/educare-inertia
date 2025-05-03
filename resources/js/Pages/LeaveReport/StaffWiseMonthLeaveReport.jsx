import DashboardLayout from '@/Layouts/DashboardLayout';
import StaffWiseMonthLeaveReportInnerLayout from "./Partials/StaffWiseMonthLeaveReport/StaffWiseMonthLeaveReportInnerLayout"
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffWiseMonthLeaveReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Wise Month Leave Report</h2>}
        >
            <Head title="Staff Wise Month Leave Report" />

            <StaffWiseMonthLeaveReportInnerLayout />
        </DashboardLayout>
    );
}