import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import HeadWiseDailyInnerLayout from './Partials/HeadWiseDailySummary/HeadWiseDailyInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function HeadWiseDailySummary({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    paymentModes,
    dailyFeePaymentSummary,
    payment_fee_types,
    payment_mode_types
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Head Wise Daily Summary</h2>}
        >
            <Head title="Fee Head Wise Daily Summary" />

            <HeadWiseDailyInnerLayout
                paymentModes={paymentModes}
                dailyFeePaymentSummary={dailyFeePaymentSummary}
                payment_fee_types={payment_fee_types}
                payment_mode_types={payment_mode_types}
            />
        </DashboardLayout>
    );
}
