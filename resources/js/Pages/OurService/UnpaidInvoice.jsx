import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ErpUnpaidInvoiceInnerLayout from './Partials/UnpaidInvoice/ErpUnpaidInvoiceInnerLayout';

export default function UnpaidInvoice({
    auth,
    siteData,
    dueInvoices
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h2>}
        >
            <Head title="Holidays" />

            <ErpUnpaidInvoiceInnerLayout
                dueInvoices={dueInvoices}
            />
        </DashboardLayout>
    );
}
