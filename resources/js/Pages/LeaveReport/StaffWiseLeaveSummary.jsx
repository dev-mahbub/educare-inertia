import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffWiseLeaveSummaryInnerLayout from './Partials/StaffWiseLeaveSummary/StaffWiseLeaveSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffWiseLeaveSummary({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Wise Leave Summary</h2>}
        >
            <Head title="Staff Wise Leave Summary" />

            <StaffWiseLeaveSummaryInnerLayout />
        </DashboardLayout>
    );
}