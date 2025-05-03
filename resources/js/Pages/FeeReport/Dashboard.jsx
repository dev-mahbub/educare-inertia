import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeManagementReportInnerLayout from './Partials/FeeManagementReport/FeeManagementReportLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Dashboard({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Dashboard</h2>}
        >
            <Head title="Fee Dashboard" />

            <FeeManagementReportInnerLayout />
        </DashboardLayout>
    );
}
