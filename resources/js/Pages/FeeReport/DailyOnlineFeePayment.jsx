import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import DailyOnlineFeePaymentInnerLayout from "./Partials/DailyOnlineFeePayment/DailyOnlineFeePaymentInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function DailyOnlineFeePayment({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fee Daily Online Fee Payment
                </h2>
            }
        >
            <Head title="Fee Daily Online Fee Payment" />

            <DailyOnlineFeePaymentInnerLayout />
        </DashboardLayout>
    );
}
