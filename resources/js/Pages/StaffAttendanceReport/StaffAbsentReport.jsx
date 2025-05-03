import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffAbsentReportInnerLayout from './Partials/StaffAbsentReport/StaffAbsentReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffAbsentReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Absent Report</h2>}
        >
            <Head title="Staff Absent Report" />

            <StaffAbsentReportInnerLayout />
        </DashboardLayout>
    );
}
