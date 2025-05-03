import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentLateFineReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">StudentLateFineReport</h2>}
        >
            <Head title="StudentLateFineReport" />

            <div>StudentLateFineReport</div>
        </DashboardLayout>
    );
}