import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import YearlyHeadWisePaidSummaryInnerLayout from './Partials/YearlyHeadWisePaidSummary/YearlyHeadWisePaidSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function YearlyHeadWisePaidSummary({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    paymentModes,
    yearlyFeePaymentSummary,
    month_wise_amounts,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Yearly Head Wise Paid Summary</h2>}
        >
            <Head title="Fee Yearly Head Wise Paid Summary" />

           <YearlyHeadWisePaidSummaryInnerLayout
                paymentModes={paymentModes}
                yearlyFeePaymentSummary={yearlyFeePaymentSummary}
                month_wise_amounts={month_wise_amounts}
           />
        </DashboardLayout>
    );
}
