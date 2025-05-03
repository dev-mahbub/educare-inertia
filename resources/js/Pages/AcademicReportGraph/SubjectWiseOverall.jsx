import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SubjectWiseReportGraphicallyInnerLayout from "./Partials/GraphSubjectWiseOverall/SubjectWiseReportGraphicallyInnerLayout";

export default function SubjectWiseOverall({
    auth,
    siteData,
    exams,
    classrooms,
    subjects,
    ranges = [],
    markRanges = [],
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Graph-Subject wise overall
                </h2>
            }
        >
            <Head title="Graph-Subject wise overall" />

            <SubjectWiseReportGraphicallyInnerLayout
                exams={exams}
                classrooms={classrooms}
                subjects={subjects}
                ranges={ranges}
                markRanges={markRanges}
            />
        </DashboardLayout>
    );
}
