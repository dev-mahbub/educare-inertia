import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import GraphWeakersReportInnerLayout from "./Partials/GraphWeakersReport/GraphWeakersReportInnerLayout";

export default function Weaker({
    auth,
    siteData,
    exams,
    classrooms,
    subjects,
    graphWeakerReport,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Graph-Wakers Report
                </h2>
            }
        >
            <Head title="Graph-Weakers Report" />

            <GraphWeakersReportInnerLayout
                exams={exams}
                classrooms={classrooms}
                subjects={subjects}
                graphWeakerReport={graphWeakerReport}
            />
        </DashboardLayout>
    );
}
