import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import PayScaleInnerLayout from "./Partials/PayScale/PayScaleInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function PayScale({
    auth,
    siteData,
    earningTypes,
    deductionTypes,
    payScales
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pay Scale
                </h2>
            }
        >
            <Head title="Pay Scale" />

            <PayScaleInnerLayout
                earningTypes={earningTypes}
                deductionTypes={deductionTypes}
                payScales={payScales}
            />
        </DashboardLayout>
    );
}
