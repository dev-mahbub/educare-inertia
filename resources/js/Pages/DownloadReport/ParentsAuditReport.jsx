import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ParentsAuditReportInnerLayout from './Partials/ParentsAuditReport/ParentsAuditReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ParentsAuditReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parents Audit Report</h2>}
        >
            <Head title="Parents Audit Report" />

            <ParentsAuditReportInnerLayout />
        </DashboardLayout>
    );
}
