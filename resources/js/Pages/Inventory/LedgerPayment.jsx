import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import LedgerPaymentInnerLayout from './Partials/Transaction/LedgerPayment/LedgerPaymentInnerLayout';

export default function LedgerPayment({
    auth,
    siteData,
    accountGroupTitles,
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
            <LedgerPaymentInnerLayout
                accountGroupTitles={accountGroupTitles}
                ledgerGroupTitles={ledgerGroupTitles}
                ledgerTitles={ledgerTitles}
                paymentModes={paymentModes}
                nextReceiptNo={nextReceiptNo}
            />
        </DashboardLayout>
    );
}

