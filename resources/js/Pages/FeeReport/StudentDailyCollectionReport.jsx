import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DailyCollectionInnerLayout from './Partials/StudentDailyCollectionReport/DailyCollectionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentDailyCollectionReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    paymentModes,
    dailyFeePaymentReports,
    totalPaidByPaymentMode,
    totalPaidByAdmin
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Daily Collection</h2>}
        >
            <Head title="Fee Daily Collection" />

            <DailyCollectionInnerLayout
                paymentModes={paymentModes}
                dailyFeePaymentReports={dailyFeePaymentReports}
                totalPaidByPaymentMode={totalPaidByPaymentMode}
                totalPaidByAdmin={totalPaidByAdmin}
            />
        </DashboardLayout>
    );
}
