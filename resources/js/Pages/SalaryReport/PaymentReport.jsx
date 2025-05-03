import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import PaymentReportInnerLayout from "./Partials/PaymentReport/PaymentReportInnerLayout";

export default function PaymentReport({
    auth,
    siteData,
    paymentMonths,
    staffTypes,
    statusArr,
    salaryPaymentReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Payment Report
                </h2>
            }
        >
            <Head title="Payment Report" />

            <PaymentReportInnerLayout
                paymentMonths={paymentMonths}
                staffTypes={staffTypes}
                statusArr={statusArr}
                salaryPaymentReport={salaryPaymentReport}
            />
        </DashboardLayout>
    );
}
