import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StaffLeaveSettingChangesHistoryInnerLayout from './Partials/StaffLeaveSettingChangesHistory/StaffLeaveSettingChangesHistoryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StaffLeaveSettingChangesHistory({
    auth,
    siteData,
    staffs,
    staffTypes,
    staffLeaveSettings
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Staff Leave Setting Changes History</h2>}
        >
            <Head title="Staff Leave Setting Changes History" />

            <StaffLeaveSettingChangesHistoryInnerLayout
                staffs={staffs}
                staffTypes={staffTypes}
                staffLeaveSettings={staffLeaveSettings}
            />
        </DashboardLayout>
    );
}
