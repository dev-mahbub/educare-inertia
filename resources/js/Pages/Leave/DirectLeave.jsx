import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DirectLeaveInnerLayout from './Partials/DirectLeave/DirectLeaveInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DirectLeave({
    auth,
    siteData,
    staffs,
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leave Direct</h2>}
        >
            <Head title="Leave Direct" />

            <DirectLeaveInnerLayout
                staffs={staffs}
                leaves={leaves}
                leaveTypes={leaveTypes}
                leaveShifts={leaveShifts}
                dayTypes={dayTypes}
                staffLeaveAllocations={staffLeaveAllocations}
                staff={staff}
            />
        </DashboardLayout>
    );
}
