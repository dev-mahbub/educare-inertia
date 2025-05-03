import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LeaveSettingInnerLayout from './Partials/LeaveSetting/LeaveSettingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function LeaveSetting({
    auth,
    siteData,
    leaveSetting
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leave Setting</h2>}
        >
            <Head title="Leave Setting" />

            <LeaveSettingInnerLayout
                leaveSetting={leaveSetting}
            />
        </DashboardLayout>
    );
}
