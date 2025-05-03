import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PaymentReportInnerLayout from './Partials/AccountReport/PaymentReport/PaymentReportInnerLayout';

export default function PaymentReport({
    auth,
    siteData,
    paymentReport,
    paymentModes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <PaymentReportInnerLayout
                paymentReport={paymentReport}
                paymentModes={paymentModes}
            />
        </DashboardLayout>
    );
}
