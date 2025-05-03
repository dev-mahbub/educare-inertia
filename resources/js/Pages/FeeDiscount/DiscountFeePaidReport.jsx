import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PaidDiscountReportInnerLayout from './Partials/Discount/PaidDiscountReport/PaidDiscountReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DiscountFeePaidReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    fees,
    discounts,
    discountPaidReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Paid Concession Report</h2>}
        >
            <Head title="Paid Concession Report" />

            <PaidDiscountReportInnerLayout
                fees ={fees}
                discounts={discounts}
                discountPaidReport={discountPaidReport}
            />
        </DashboardLayout>
    );
}
