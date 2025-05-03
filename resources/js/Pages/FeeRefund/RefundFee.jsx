import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RefundFeeInnerLayout from './Partials/RefundFee/RefundFeeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RefundFee({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    students,
    studentFeeInstallments,
    feeRefundPaymentModes,
    studentFeePaymentRefunds,
    banks,
    student
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Refund Fee</h2>}
        >
            <Head title="Refund Fee" />

            <RefundFeeInnerLayout
                studentFeeInstallments={studentFeeInstallments}
                classrooms={classrooms}
                students={students}
                feeRefundPaymentModes={feeRefundPaymentModes}
                studentFeePaymentRefunds={studentFeePaymentRefunds}
                banks={banks}
                student={student}
            />
        </DashboardLayout>
    );
}
