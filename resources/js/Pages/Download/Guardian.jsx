import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import GuardianInnerLayout from "./Partials/Guardian/GuardianInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function Guardian({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    guardians
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Guardian
                </h2>
            }
        >
            <Head title="Guardian" />
            <GuardianInnerLayout
                guardians={guardians}
            />
        </DashboardLayout>
    );
}
