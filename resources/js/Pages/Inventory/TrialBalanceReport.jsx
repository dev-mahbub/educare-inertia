import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TrialBalanceReportInnerLayout from './Partials/AccountReport/TrialBalanceReport/TrialBalanceReportInnerLayout';

export default function ImportItem({
    auth,
    siteData,
    accountGroupSummary
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <TrialBalanceReportInnerLayout
                accountGroupSummary={accountGroupSummary}
            />
        </DashboardLayout>
    );
}
