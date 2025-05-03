import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BulkFeePaymentInnerLayout from './Partials/BulkFeePayment/BulkFeePaymentInnerLayout';

export default function InstallmentPayment({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    classrooms,
    banks,
    paymentModes,
    fees,
    bankAccounts,
    employmentCategories,
    studentFeeInstallments,
    students
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bulk Fee Payment
                </h2>
            }
        >
            <Head title="Bulk Fee Payment" />

            <BulkFeePaymentInnerLayout
                classrooms={classrooms}
                fees={fees}
                banks={banks}
                bankAccounts={bankAccounts}
                paymentModes={paymentModes}
                employmentCategories={employmentCategories}
                studentFeeInstallments={studentFeeInstallments}
                students={students}
            />
        </DashboardLayout>
    );
}
