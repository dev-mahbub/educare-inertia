import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassInstallmentWiseSummaryInnerLayout from './Partials/ClassInstallmentWiseSummary/ClassInstallmentWiseSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ClassWiseSummary({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    feeCollectionSummary
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Class Wise Summary</h2>}
        >
            <Head title="Fee Class Wise Summary" />

            <ClassInstallmentWiseSummaryInnerLayout
                feeCollectionSummary={feeCollectionSummary}
            />
        </DashboardLayout>
    );
}
