import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MemberManageInnerLayout from './Partials/MemberManage/MemberManageInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MemberManage({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Member Manage</h2>}
        >
            <Head title="Member Manage" />

            <MemberManageInnerLayout />
        </DashboardLayout>
    );
}