import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentPaymentsInnerLayout from './Partials/StudentPayments/StudentPaymentsInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentPayments({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    students,
    student,
    studentFeePaymentReports,
    feeReceiptCopy,
    feeReceiptPageSize
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Payments</h2>}
        >
            <Head title="Student Payments" />

            <StudentPaymentsInnerLayout
                classrooms={classrooms}
                students={students}
                student={student}
                studentFeePaymentReports={studentFeePaymentReports}
                feeReceiptCopy={feeReceiptCopy}
                feeReceiptPageSize={feeReceiptPageSize}
            />
        </DashboardLayout>
    );
}
