import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import UpdateBiometricCodeTableInnerLayout from "./Partials/UpdateBiometricCode/UpdateBiometricCodeTableInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function SetSectionWorking({
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
                    Set Section Working
                </h2>
            }
        >
            <Head title="Set Section Working" />

            <UpdateBiometricCodeTableInnerLayout />
        </DashboardLayout>
    );
}
