import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RefundCancelReportInnerLayout from './Partials/RefundCancelReport/RefundCancelReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RefundCancelReport({ auth, siteData, mustVerifyEmail, status, schools, feePaymentRefunds }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Refund Cancel Report</h2>}
        >
            <Head title="Refund Cancel Report" />

            <RefundCancelReportInnerLayout feePaymentRefunds={feePaymentRefunds}/>
        </DashboardLayout>
    );
}
