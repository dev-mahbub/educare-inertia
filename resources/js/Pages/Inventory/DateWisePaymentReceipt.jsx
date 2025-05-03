import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DateWisePaymentReceiptInnerLayout from './Partials/AccountReport/DateWisePaymentReceipt/DateWisePaymentReceiptInnerLayout';

export default function DateWisePaymentReceipt({
    auth,
    siteData,
    paymentTypes,
    ledgers,
    headWisePaymentReport,
    ledgerTitles,
    headWiseSummary
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <DateWisePaymentReceiptInnerLayout
                paymentTypes={paymentTypes}
                ledgers={ledgers}
                headWisePaymentReport={headWisePaymentReport}
                ledgerTitles={ledgerTitles}
                headWiseSummary={headWiseSummary}
            />
        </DashboardLayout>
    );
}
