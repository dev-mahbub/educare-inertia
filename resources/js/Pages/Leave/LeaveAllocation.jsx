import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LeaveAllocationInnerLayout from './Partials/LeaveAllocation/LeaveAllocationInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function LeaveAllocation({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    teachingTypes,
    genders,
    staffLeaveAllocations,
    leaveTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leave Allocation</h2>}
        >
            <Head title="Leave Allocation" />

            <LeaveAllocationInnerLayout
                teachingTypes={teachingTypes}
                genders={genders}
                staffLeaveAllocations={staffLeaveAllocations}
                leaveTypes={leaveTypes}
            />
        </DashboardLayout>
    );
}
