import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import AdvancePaymentReportInnerLayout from "./Partials/AdvancePaymentReport/AdvancePaymentReportInnerLayout";

const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function AdvancePaymentReport({
    auth,
    siteData,
    staffs,
    paymentMonths,
    staffAdvancePayments
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Advance Payment Report
                </h2>
            }
        >
            <Head title="Advance Payment Report" />

            <AdvancePaymentReportInnerLayout
                staffs={staffs}
                paymentMonths={paymentMonths}
                staffAdvancePayments={staffAdvancePayments}
            />
        </DashboardLayout>
    );
}
