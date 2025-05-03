import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DailyCollectionInnerLayout from './Partials/DailyCollection/DailyCollectionInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DailyCollection({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    feeTypesEnum,
    classNames,
    classrooms,
    paymentModes,
    dailyFeePaymentReports,
    totalPaidByPaymentMode,
    totalPaidByAdmin,
    feeReceiptPageSize,
    feeReceiptCopy,
    regFeeReceiptPageSize,
    regFeeReceiptCopy
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Daily Collection</h2>}
        >
            <Head title="Fee Daily Collection" />

            <DailyCollectionInnerLayout
                feeTypesEnum ={feeTypesEnum}
                classNames={classNames}
                classrooms={classrooms}
                paymentModes={paymentModes}
                dailyFeePaymentReports={dailyFeePaymentReports}
                totalPaidByPaymentMode={totalPaidByPaymentMode}
                totalPaidByAdmin={totalPaidByAdmin}
                feeReceiptPageSize={feeReceiptPageSize}
                feeReceiptCopy={feeReceiptCopy}
                regFeeReceiptPageSize={regFeeReceiptPageSize}
                regFeeReceiptCopy={regFeeReceiptCopy}
            />
        </DashboardLayout>
    );
}
