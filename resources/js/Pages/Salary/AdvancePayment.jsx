import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import AdvancePaymentInnerLayout from "./Partials/AdvancePayment/AdvancePaymentInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function AdvancePayment({
    auth,
    siteData,
    staffs,
    paymentModes,
    banks,
    paymentMonths,
    staffAdvancePayments,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Advance Payment
                </h2>
            }
        >
            <Head title="Advance Payment" />

            <AdvancePaymentInnerLayout
                staffs={staffs}
                paymentModes={paymentModes}
                banks={banks}
                paymentMonths={paymentMonths}
                staffAdvancePayments={staffAdvancePayments}
            />
        </DashboardLayout>
    );
}
