import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import EditHostelFeeGroupInnerLayout from "./Partials/HostelFeeGroup/Edit/EditHostelFeeGroupInnerLayout";

export default function HostelFeeGroup({
    auth,
    siteData,
    feeTypeData,
    hostelFees,
    hostelFee,
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

            <EditHostelFeeGroupInnerLayout
                feeTypeData={feeTypeData}
                hostelFees={hostelFees}
                hostelFee={hostelFee}
            />
        </DashboardLayout>
    );
}
