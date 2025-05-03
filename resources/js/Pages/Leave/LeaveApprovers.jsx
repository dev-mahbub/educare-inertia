import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LeaveApproversInnerLayout from './Partials/LeaveApprovers/LeaveApproversInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function LeaveApprovers({
    auth,
    siteData,
    staffs,
    leaveApprovers
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leave Approvers</h2>}
        >
            <Head title="Leave Approvers" />

            <LeaveApproversInnerLayout
                staffs={staffs}
                leaveApprovers={leaveApprovers}
            />
        </DashboardLayout>
    );
}
