import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SubjectWiseReportCardInnerLayout from "./Partials/SubjectWiseReportCard/SubjectWiseReportCardInnerLayout";

export default function SubjectReport({
    auth,
    siteData,
    classrooms,
    subjects,
    subjeteWiseData,
    examWiseData
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Subject Wise Report
                </h2>
            }
        >
            <Head title="Subject Wise Report" />

            <SubjectWiseReportCardInnerLayout
                classrooms={classrooms}
                subjects={subjects}
                subjeteWiseData={subjeteWiseData}
                examWiseData={examWiseData}
            />
        </DashboardLayout>
    );
}
