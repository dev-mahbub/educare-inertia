import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import HostelFeeGroupInnerLayout from "./Partials/HostelFeeGroup/HostelFeeGroupInnerLayout";

export default function HostelFeeGroup({
    auth,
    siteData,
    feeTypeData,
    hostelFees,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    HostelFeeGroup
                </h2>
            }
        >
            <Head title="Hostel Fee" />

            <HostelFeeGroupInnerLayout
                feeTypeData={feeTypeData}
                hostelFees={hostelFees}
            />
        </DashboardLayout>
    );
}
