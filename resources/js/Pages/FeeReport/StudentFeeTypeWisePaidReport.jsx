import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentFeeTypeWisePaidReport({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Fee Type Wise Paid Report</h2>}
        >
            <Head title="Student Fee Type Wise Paid Report" />

            <div>Student Fee Type Wise Paid Report</div>
        </DashboardLayout>
    );
}
