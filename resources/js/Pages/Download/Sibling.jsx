import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SiblingInnerLayout from "./Partials/Sibling/SiblingInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function Sibling({
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
                    Sibling
                </h2>
            }
        >
            <Head title="Sibling" />

            <SiblingInnerLayout />
        </DashboardLayout>
    );
}
