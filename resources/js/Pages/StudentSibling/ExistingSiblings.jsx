import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import ExistingSiblingsInnerLayout from "./Partials/ExistingSiblings/ExistingSiblingsInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function ExistingSiblings({
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
                    Existing Siblings
                </h2>
            }
        >
            <Head title="Existing Siblings" />

            <ExistingSiblingsInnerLayout />
        </DashboardLayout>
    );
}
