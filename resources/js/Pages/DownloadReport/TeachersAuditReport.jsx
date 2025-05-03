import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeachersAuditReportInnerLayout from './Partials/TeachersAuditReport/TeachersAuditReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeachersAuditReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teachers Audit Report</h2>}
        >
            <Head title="Teachers Audit Report" />

            <TeachersAuditReportInnerLayout />
        </DashboardLayout>
    );
}
