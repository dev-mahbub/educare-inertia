import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import ExamAttendanceInnerLayout from "./Partials/ExamAttendanceInnerLayout";

export default function Roasters({
    auth,
    siteData,
    students,
    classrooms,
    exams,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Exam Attendance
                </h2>
            }
        >
            <Head title="Exam Attendance" />

            <ExamAttendanceInnerLayout
                students={students}
                classrooms={classrooms}
                exams={exams}
            />
        </DashboardLayout>
    );
}
