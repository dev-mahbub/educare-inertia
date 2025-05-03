import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EsiReportInnerLayout from './Partials/EsiReport/EsiReportInnerLayout';

export default function EsiReport({
    auth,
    siteData,
    paymentMonths,
    earningTypes,
    staffSalaryPayments
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Esi Report</h2>}
        >
            <Head title="Esi Report" />

            <EsiReportInnerLayout
                paymentMonths={paymentMonths}
                earningTypes={earningTypes}
                staffSalaryPayments={staffSalaryPayments}
            />
        </DashboardLayout>
    );
}
