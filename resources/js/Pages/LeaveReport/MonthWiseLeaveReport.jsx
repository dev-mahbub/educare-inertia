import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MonthWiseLeaveReportInnerLayout from './Partials/MonthWiseLeaveReport/MonthWiseLeaveReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MonthWiseLeaveReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Month Wise Leave Report</h2>}
        >
            <Head title="Month Wise Leave Report" />

            <MonthWiseLeaveReportInnerLayout />
        </DashboardLayout>
    );
}