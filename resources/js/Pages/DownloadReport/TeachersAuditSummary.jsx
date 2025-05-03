import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import TeachersAuditSummaryInnerLayout from "./Partials/TeachersAuditSummary/TeachersAuditSummaryInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function TeachersAuditSummary({
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
                    Teachers Audit Summary
                </h2>
            }
        >
            <Head title="Teachers Audit Summary" />

            <TeachersAuditSummaryInnerLayout />
        </DashboardLayout>
    );
}
