import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import TeachersParentsAuditListInnerLayout from "./Partials/TeachersParentsAuditList/TeachersParentsAuditListInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function TeachersParentsAuditList({
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
                    Teachers Parents Audit List
                </h2>
            }
        >
            <Head title="Teachers Parents Audit List" />
            <TeachersParentsAuditListInnerLayout />
        </DashboardLayout>
    );
}
