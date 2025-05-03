import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import GraphToppersReportInnerLayout from "./Partials/GraphToppersReport/GraphToppersReportInnerLayout";

export default function Toppers({
    auth,
    siteData,
    exams,
    classrooms,
    subjects,
    topperReport,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Graph-Toppers Report
                </h2>
            }
        >
            <Head title="Graph-Toppers Report" />

            <GraphToppersReportInnerLayout
                exams={exams}
                classrooms={classrooms}
                subjects={subjects}
                topperReport={topperReport}
            />
        </DashboardLayout>
    );
}
