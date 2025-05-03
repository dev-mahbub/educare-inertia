import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ExpectedDiscountReportInnerLayout from './Partials/Discount/ExpectedDiscountReport/ExpectedDiscountReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DiscountFeeExpectedReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    fees,
    discounts,
    expectedStudentFeeDiscountReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Expected Concession Report</h2>}
        >
            <Head title="Expected Concession Report" />

            <ExpectedDiscountReportInnerLayout
                fees={fees}
                discounts={discounts}
                expectedStudentFeeDiscountReport={expectedStudentFeeDiscountReport}
             />
        </DashboardLayout>
    );
}
