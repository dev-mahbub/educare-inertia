import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LeaveTypeInnerLayout from './Partials/LeaveType/LeaveTypeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function LeaveType({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    leaveTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leave Type</h2>}
        >
            <Head title="Leave Type" />

            <LeaveTypeInnerLayout
                leaveTypes={leaveTypes}
            />
        </DashboardLayout>
    );
}
