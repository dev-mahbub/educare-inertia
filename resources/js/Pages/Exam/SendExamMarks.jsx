import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SendExamMarksInnerLayout from "./Partials/SendExamMarks/SendExamMarksInnerLayout";

export default function SendExamMarks({
    auth,
    siteData,
    exams,
    classrooms,
    studentMark,
    studentSubject,
    totalCount,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Send Exam Marks
                </h2>
            }
        >
            <Head title="Send Exam Marks" />

            <SendExamMarksInnerLayout
                exams={exams}
                classrooms={classrooms}
                studentMark={studentMark}
                studentSubject={studentSubject}
                totalCount={totalCount}
            />
        </DashboardLayout>
    );
}
