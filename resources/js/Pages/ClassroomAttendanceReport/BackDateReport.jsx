import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function BackDateReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Back Date Report</h2>}
        >
            <Head title="Back Date Report" />

            <div>Back Date Report</div>
        </DashboardLayout>
    );
}
