import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import HostelClassSummaryReportInnerLayout from "./Partials/HostelClassSummaryReport/HostelClassSummaryReportInnerLayout";

export default function HostelClassSummaryReport({
    auth,
    siteData,
    classroomData,
    studentDetails,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Hostel Class Summary Report
                </h2>
            }
        >
            <Head title="Hostel Class Summary Report" />

            <HostelClassSummaryReportInnerLayout
                classroomData={classroomData}
                studentDetails={studentDetails}
            />
        </DashboardLayout>
    );
}
