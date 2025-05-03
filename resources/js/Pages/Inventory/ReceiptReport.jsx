import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PaymentReportInnerLayout from './Partials/AccountReport/PaymentReport/PaymentReportInnerLayout';
import ReceiptReportInnerLayout from './Partials/AccountReport/ReceiptReport/ReceiptReportInnerLayout';

export default function ReceiptReport({
    auth,
    siteData,
    receiptReport,
    ledgerTitles,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <ReceiptReportInnerLayout
                receiptReport={receiptReport}
                ledgerTitles={ledgerTitles}
            />
        </DashboardLayout>
    );
}
