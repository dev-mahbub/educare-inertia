import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LedgerSearchListLedgerInnerLayout from './Partials/Ledger/SearchList/LedgerSearchListLedgerInnerLayout';

export default function LedgerSearch({
    auth,
    siteData,
    ledgers,
    accountGroupTitles,
    ledgerAmountArr,
    accountId,
    search,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <LedgerSearchListLedgerInnerLayout
                ledgers={ledgers}
                accountGroupTitles={accountGroupTitles}
                ledgerAmountArr={ledgerAmountArr}
                accountId={accountId}
                search={search}
            />
        </DashboardLayout>
    );
}
