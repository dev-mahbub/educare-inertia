import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import GroupSummaryReportInnerLayout from './Partials/AccountReport/GroupSummaryReport/GroupSummaryReportInnerLayout';

export default function GroupSummaryReport({
    auth,
    siteData,
    accountGroups,
    groupSummary
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <GroupSummaryReportInnerLayout
                accountGroups={accountGroups}
                groupSummary={groupSummary}
            />
        </DashboardLayout>
    );
}
