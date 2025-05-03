import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LeaveTypeWiseMonthLeaveReportInnerLayout from './Partials/LeaveTypeWiseMonthLeaveReport/LeaveTypeWiseMonthLeaveReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function LeaveTypeWiseMonthLeaveReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leave Type Wise Month Leave Report</h2>}
        >
            <Head title="Leave Type Wise Month Leave Report" />

            <LeaveTypeWiseMonthLeaveReportInnerLayout />
        </DashboardLayout>
    );
}