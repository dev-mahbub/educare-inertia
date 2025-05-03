import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DateWiseClassSummaryInnerLayout from './Partials/DateWiseClassSummary/DateWiseClassSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DateWiseClassSummary({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    fees,
    feeCollectionSummary
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Date Wise Class Summary</h2>}
        >
            <Head title="Fee Date Wise Class Summary" />

            <DateWiseClassSummaryInnerLayout
                fees={fees}
                feeCollectionSummary={feeCollectionSummary}
            />
        </DashboardLayout>
    );
}
