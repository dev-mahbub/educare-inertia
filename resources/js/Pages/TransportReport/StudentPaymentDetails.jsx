import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentPaymentReportInnerLayout from './Partials/StudentPaymentReport/StudentPaymentReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentPaymentDetails({ auth, siteData, vouchers, students, StudentFees }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Payment Details</h2>}
        >
            <Head title="Student Payment Details" />

            <StudentPaymentReportInnerLayout
                vouchers={vouchers}
                students={students}
                StudentFees={StudentFees}
            />
        </DashboardLayout>
    );
}
