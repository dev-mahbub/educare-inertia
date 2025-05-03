import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import TcSummaryReportInnerLayout from "./Partials/TcSummaryReport/TcSummaryReportInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function TcSummaryReport({
    auth,
    siteData,
    tcSummery,
    tcStudents,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tc Summary Report
                </h2>
            }
        >
            <Head title="Tc Summary Report" />

            <TcSummaryReportInnerLayout
                tcSummery={tcSummery}
                tcStudents={tcStudents}
            />
        </DashboardLayout>
    );
}
