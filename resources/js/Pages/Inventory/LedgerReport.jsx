import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LedgerReportInnerLayout from './Partials/AccountReport/LedgerReport/LedgerReportInnerLayout';

export default function LedgerReport({
    auth,
    siteData,
    ledgers,
    ledgerReport,
    openingBalance,
    amountType
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <LedgerReportInnerLayout
                ledgers={ledgers}
                ledgerReport={ledgerReport}
                openingBalance={openingBalance}
                amountType={amountType}
            />
        </DashboardLayout>
    );
}
