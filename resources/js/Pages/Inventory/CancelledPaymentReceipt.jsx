import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CancelledPaymentReceiptInnerLayout from './Partials/AccountReport/CancelledPaymentReceipt/CancelledPaymentReceiptInnerLayout';

export default function ImportItem({
    auth,
    siteData,
    paymentTypes,
    paymentReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CancelledPaymentReceiptInnerLayout
                paymentTypes={paymentTypes}
                paymentReport={paymentReport}
            />
        </DashboardLayout>
    );
}
