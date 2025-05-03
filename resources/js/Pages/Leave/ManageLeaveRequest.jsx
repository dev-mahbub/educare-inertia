import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ManageLeaveRequestInnerLayout from './Partials/ManageLeaveRequest/ManageLeaveRequestInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ManageLeaveRequest({
    auth,
    siteData,
    leaveStatusArr,
    months,
    leaves,
    isLeaveApprover
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Leave Request</h2>}
        >
            <Head title="Manage Leave Request" />

            <ManageLeaveRequestInnerLayout
                leaveStatusArr={leaveStatusArr}
                months={months}
                leaves={leaves}
                siteData={siteData}
                isLeaveApprover={isLeaveApprover}
            />
        </DashboardLayout>
    );
}
