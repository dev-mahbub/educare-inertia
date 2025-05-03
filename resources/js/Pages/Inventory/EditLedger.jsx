import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditLedgerInnerLayout from './Partials/Ledger/Edit/EditLedgerInnerLayout';

export default function EditLedger({
    auth,
    siteData,
    ledger,
    ledgers,
    accountGroupTitles,
    ledgerAmountArr,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <EditLedgerInnerLayout
                ledger={ledger}
                ledgers={ledgers}
                accountGroupTitles={accountGroupTitles}
                ledgerAmountArr={ledgerAmountArr}
            />
        </DashboardLayout>
    );
}
