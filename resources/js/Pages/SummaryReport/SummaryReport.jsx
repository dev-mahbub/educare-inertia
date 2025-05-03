import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SummaryReportInnerLayout from './Partials/SummaryReport/SummaryReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function SummaryReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Summary Report</h2>}
        >
            <Head title="Summary Report" />

            <SummaryReportInnerLayout />
        </DashboardLayout>
    );
}