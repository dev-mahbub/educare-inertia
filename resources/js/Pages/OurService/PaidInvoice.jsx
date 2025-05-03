import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ErpPaidInvoiceListInnerLayout from './Partials/PaidInvoice/ErpPaidInvoiceListInnerLayout';

export default function PaidInvoice({
    auth,
    siteData,
    paidInvoices
}) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h2>}
        >
            <Head title="Holidays" />

            <ErpPaidInvoiceListInnerLayout
                paidInvoices={paidInvoices}
            />
        </DashboardLayout>
    );
}
