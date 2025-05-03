import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MonthWiseLeaveReportInnerLayout from './Partials/MonthWiseLeaveReport/MonthWiseLeaveReportInnerLayout';
import StaffWiseLeaveReportInnerLayout from './Partials/StaffWiseLeaveReport/StaffWiseLeaveReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffWiseLeaveReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Wise Leave Report</h2>}
        >
            <Head title="Staff Wise Leave Report" />

            <StaffWiseLeaveReportInnerLayout />
        </DashboardLayout>
    );
}