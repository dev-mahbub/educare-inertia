import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeMainInnerLayout from './Partials/Master/FeeMain/FeeMainInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, classrooms, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Main</h2>}
        >
            <Head title="Fee Main" />
            
            <FeeMainInnerLayout />
            {/* <ManageChequeInnerLayout  /> */}
            {/* <FeePDCInnerLayout  /> */}
            {/* <FeeAllPDCListInnerLayout  /> */}
            {/* <BouncedChequeReportInnerLayout  /> */}
            {/* <ChequeReportInnerLayout  /> */}
            {/* <ClearanceReportInnerLayout  /> */}
            {/* <FeePaymentInnerLayout  /> */}
            {/* <ImportInnerLayout  /> */}
            {/* <ImportHistoryInnerLayout  /> */}
            {/* <ImportPrevousDueInnerLayout  /> */}
            {/* <CreateVoucherInnerLayout  /> */}
            {/* <VoucherListInnerLayout  /> */}
            {/* <SelectStudentInnerLayout  /> */}
            {/* <TransportVoucherInnerLayout  /> */}
            {/* <RefundFeeInnerLayout  /> */}
            {/* <RefundReportInnerLayout  /> */}
            {/* <RefundCancelReportInnerLayout  /> */}
            {/* <AdjustFeeInnerLayout  /> */}
            {/* <AdjustFeeReportInnerLayout  /> */}
            {/* <NullifyFeeReportInnerLayout  /> */}
            {/* <StudentAvailingDiscountInnerLayout  /> */}
            {/* <ExpectedDiscountReportInnerLayout  /> */}
            {/* <PaidDiscountReportInnerLayout  /> */}
            {/* <AddDiscountInnerLayout  /> */}
            {/* <BulkDiscountInnerLayout  /> */}
            {/* <StudentDiscountInnerLayout  /> */}
        </DashboardLayout>
    );
}