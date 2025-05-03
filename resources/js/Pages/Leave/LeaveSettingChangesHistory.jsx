import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LeaveSettingChangesHistoryInnerLayout from './Partials/LeaveSettingChangesHistory/LeaveSettingChangesHistoryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function LeaveSettingChangesHistory({
    auth,
    siteData,
    leaveSettings
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Leave Setting Changes History</h2>}
        >
            <Head title="Leave Setting Changes History" />

            <LeaveSettingChangesHistoryInnerLayout
                leaveSettings={leaveSettings}
            />
        </DashboardLayout>
    );
}
