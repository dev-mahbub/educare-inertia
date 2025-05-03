import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MonthlyWorkDurationReportInnerLayout from './Partials/MonthlyWorkDurationReport/MonthlyWorkDurationReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MonthlyWorkDurationReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Monthly Work Duration Report</h2>}
        >
            <Head title="Monthly Work Duration Report" />

            <MonthlyWorkDurationReportInnerLayout />
        </DashboardLayout>
    );
}
