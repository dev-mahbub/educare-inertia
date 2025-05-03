import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeachersParentsAuditReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teachers Parents Audit Report</h2>}
        >
            <Head title="Teachers Parents Audit Report" />

            <div>Teachers Parents Audit Report</div>
        </DashboardLayout>
    );
}
