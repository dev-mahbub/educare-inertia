import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RequestLeaveInnerLayout from './Partials/RequestLeave/RequestLeaveInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RequestLeave({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    leaves,
    leaveTypes,
    leaveShifts,
    dayTypes,
    staffLeaveAllocations,
    staff
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request Leave</h2>}
        >
            <Head title="Request Leave" />

            <RequestLeaveInnerLayout
                leaves={leaves}
                leaveTypes={leaveTypes}
                leaveShifts={leaveShifts}
                dayTypes={dayTypes}
                staffLeaveAllocations={staffLeaveAllocations}
                staff={staff}
                siteData={siteData}
            />
        </DashboardLayout>
    );
}
