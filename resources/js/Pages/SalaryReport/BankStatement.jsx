import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BankStatementInnerLayout from './Partials/BankStatement/BankStatementInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function BankStatement({
    auth,
    siteData,
    paymentMonths,
    staffSalaryPayments
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bank Statement</h2>}
        >
            <Head title="Bank Statement" />

           <BankStatementInnerLayout
                paymentMonths={paymentMonths}
                staffSalaryPayments={staffSalaryPayments}
           />
        </DashboardLayout>
    );
}
