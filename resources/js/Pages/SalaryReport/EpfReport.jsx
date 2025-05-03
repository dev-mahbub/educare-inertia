import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EPFCalculatorInnerLayout from './Partials/EPFCalculator/EPFCalculatorInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EpfReport({
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">EPF Calculator</h2>}
        >
            <Head title="Epf Report" />

            <EPFCalculatorInnerLayout
                paymentMonths={paymentMonths}
                earningTypes={earningTypes}
                staffSalaryPayments={staffSalaryPayments}
            />
        </DashboardLayout>
    );
}
