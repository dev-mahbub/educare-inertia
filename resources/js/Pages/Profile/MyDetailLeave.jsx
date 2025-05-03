import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MyDetailLeaveInnerLayout from './Partials/MyDetailLeave/MyDetailLeaveInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MyDetailLeave({ auth, siteData, mustVerifyEmail, status, users }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <MyDetailLeaveInnerLayout />
        </DashboardLayout>
    );
}