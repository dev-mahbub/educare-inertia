import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffOnLeaveTodayInnerLayout from './Partials/StaffOnLeaveToday/StaffOnLeaveTodayInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffOnLeaveToday({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff On Leave Today</h2>}
        >
            <Head title="Staff On Leave Today" />

            <StaffOnLeaveTodayInnerLayout />
        </DashboardLayout>
    );
}