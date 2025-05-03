import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CashBookReportInnerLayout from './Partials/AccountReport/CashBookReport/CashBookReportInnerLayout';

export default function CashBookReport({
    auth,
    siteData,
    cashBookReport,
    cashBookSummary
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <CashBookReportInnerLayout
                cashBookReport={cashBookReport}
                cashBookSummary={cashBookSummary}
            />
        </DashboardLayout>
    );
}
