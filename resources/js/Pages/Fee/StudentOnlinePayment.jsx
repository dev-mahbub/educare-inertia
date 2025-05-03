import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from '@inertiajs/react';
import StudentOnlinePaymentInnerLayout from './Partials/StudentOnlinePayment/StudentOnlinePaymentInnerLayout';

export default function StudentOnlinePayment({
    auth,
    siteData,
    student,
    school,
    studentFeeInstallments,
    studentFeeVouchers,
    studentFeePaymentReports
}) {
    return (
        <GuestLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Fee Online Payment</h2>}
        >
            <Head title="Student Fee Online Payment" />

            <StudentOnlinePaymentInnerLayout
                student={student}
                school={school}
                siteData={siteData}
                studentFeeInstallments={studentFeeInstallments}
                studentFeeVouchers={studentFeeVouchers}
                studentFeePaymentReports={studentFeePaymentReports}
            />
        </GuestLayout>
    );
}
