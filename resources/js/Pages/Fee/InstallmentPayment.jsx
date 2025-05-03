import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeePaymentInnerLayout from './Partials/Payment/FeePaymentInnerLayout';

export default function InstallmentPayment({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    classrooms,
    students,
    banks,
    paymentModes,
    studentFeeInstallments,
    studentFeeVouchers,
    studentFeePaymentReports,
    filteredStudentsData,
    student,
    studentFeeDiscount,
    discounts,
    bankAccounts,
    extraFeeTypes,
    studentTransportVouchers,
    autoSelectFee,
    selectFeeSequentially,
    feeReceiptPageSize,
    feeReceiptCopy,
    isBackDateAllowed
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fee Installments
                </h2>
            }
        >
            <Head title="Fee Installments" />

            <FeePaymentInnerLayout
                classrooms={classrooms}
                students={students}
                banks={banks}
                paymentModes={paymentModes}
                studentFeeInstallments={studentFeeInstallments}
                studentFeeVouchers={studentFeeVouchers}
                studentFeePaymentReports={studentFeePaymentReports}
                filteredStudentsData={filteredStudentsData}
                student={student}
                studentFeeDiscount={studentFeeDiscount}
                discounts={discounts}
                bankAccounts={bankAccounts}
                extraFeeTypes={extraFeeTypes}
                studentTransportVouchers={studentTransportVouchers}
                autoSelectFee={autoSelectFee}
                selectFeeSequentially={selectFeeSequentially}
                feeReceiptPageSize={feeReceiptPageSize}
                feeReceiptCopy={feeReceiptCopy}
                isBackDateAllowed={isBackDateAllowed}
            />
        </DashboardLayout>
    );
}
