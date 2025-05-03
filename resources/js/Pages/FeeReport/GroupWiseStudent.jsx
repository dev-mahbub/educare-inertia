import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function GroupWiseStudent({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Group Wise Student</h2>}
        >
            <Head title="Fee Group Wise Student" />

            <div>Fee Group Wise Student</div>
        </DashboardLayout>
    );
}
