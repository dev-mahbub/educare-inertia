import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import EarninglnnerLayout from "./Partials/Earning/EarninglnnerLayout";

const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function Earning({
    auth,
    siteData,
    earningTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Header Earning Sallary
                </h2>
            }
        >
            <Head title="Earning" />

            <EarninglnnerLayout
                earningTypes={earningTypes}
            />
        </DashboardLayout>
    );
}
