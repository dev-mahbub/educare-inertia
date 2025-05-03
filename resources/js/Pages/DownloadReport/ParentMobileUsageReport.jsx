import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import ParentMobileUsageReportInnerLayout from "./Partials/ParentMobileUsageReport/ParentMobileUsageReportInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function ParentMobileUsageReport({
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
                    Parent Mobile Usage Report
                </h2>
            }
        >
            <Head title="Parent Mobile Usage Report" />

            <ParentMobileUsageReportInnerLayout />
        </DashboardLayout>
    );
}
