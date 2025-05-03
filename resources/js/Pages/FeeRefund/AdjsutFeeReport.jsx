import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AdjustFeeReportInnerLayout from './Partials/AdjustFeeReport/AdjustFeeReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AdjsutFeeReport({ auth, siteData, mustVerifyEmail, status, schools, adjustFeePayments }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Adjust Fee Report</h2>}
        >
            <Head title="Adjust Fee Report" />

            <AdjustFeeReportInnerLayout adjustFeePayments={adjustFeePayments}/>
        </DashboardLayout>
    );
}
