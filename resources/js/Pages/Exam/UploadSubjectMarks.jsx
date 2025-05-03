import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import UploadExamMarksInnerLayout from "./Partials/ExamMarks/UploadExamMarks/UploadExamMarksInnerLayout";

export default function UploadSubjectMarks({
    auth,
    siteData,
    exams,
    classrooms,
    subjects,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Upload Exam Marks
                </h2>
            }
        >
            <Head title="Upload Exam Marks" />

            <UploadExamMarksInnerLayout
                exams={exams}
                classrooms={classrooms}
                subjects={subjects}
            />
        </DashboardLayout>
    );
}
