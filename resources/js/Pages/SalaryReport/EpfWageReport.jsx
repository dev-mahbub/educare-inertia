import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EpfWageReportInnerLayout from './Partials/EpfWageReport/EpfWageReportInnerLayout';

export default function EpfWageReport({
    auth,
    siteData,
    paymentMonths,
    staffSalaryPayments
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Epf Wage Report</h2>}
        >
            <Head title="Epf Wage Report" />

            <EpfWageReportInnerLayout
                paymentMonths={paymentMonths}
                staffSalaryPayments={staffSalaryPayments}
            />
        </DashboardLayout>
    );
}
