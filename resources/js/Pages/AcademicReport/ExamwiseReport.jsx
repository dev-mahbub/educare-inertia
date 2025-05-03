import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import ExamWiseReportInnerLayout from "./Partials/ExamWiseReport/ExamWiseReportInnerLayout";

export default function ExamwiseReport({
    auth,
    siteData,
    classrooms,
    exams,
    examSubjects,
    examData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Exam Wise Report
                </h2>
            }
        >
            <Head title="Exam Wise Report" />

            <ExamWiseReportInnerLayout
                classrooms={classrooms}
                exams={exams}
                examSubjects={examSubjects}
                examData={examData}
            />
        </DashboardLayout>
    );
}
