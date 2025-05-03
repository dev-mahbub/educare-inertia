import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PrintSalarySlipInnerLayout from './Partials/PrintSalarySlip/PrintSalarySlipInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PrintSalarySlip({
    auth,
    siteData,
    paymentMonths
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Print Salary Slip</h2>}
        >
            <Head title="Print Salary Slip" />

            <PrintSalarySlipInnerLayout
                paymentMonths={paymentMonths}
            />
        </DashboardLayout>
    );
}
