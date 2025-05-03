import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LedgerReceiptInnerLayout from './Partials/Transaction/LedgerReceipt/LedgerReceiptInnerLayout';

export default function LedgerReceipt({
    auth,
    siteData,
    ledgerGroupTitles,
    ledgerTitles,
    paymentModes,
    nextReceiptNo
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <LedgerReceiptInnerLayout
                ledgerGroupTitles={ledgerGroupTitles}
                ledgerTitles={ledgerTitles}
                paymentModes={paymentModes}
                nextReceiptNo={nextReceiptNo}
            />
        </DashboardLayout>
    );
}

