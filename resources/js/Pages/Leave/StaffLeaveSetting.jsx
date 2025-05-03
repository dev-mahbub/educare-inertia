import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffLeaveSettingInnerLayout from './Partials/StaffLeaveSetting/StaffLeaveSettingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffLeaveSetting({
    auth,
    siteData,
    leaveSetting,
    staffs,
    staffTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Leave Setting</h2>}
        >
            <Head title="Staff Leave Setting" />

            <StaffLeaveSettingInnerLayout
                leaveSetting={leaveSetting}
                staffs={staffs}
                staffTypes={staffTypes}
            />
        </DashboardLayout>
    );
}
