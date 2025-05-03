import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import StudentSubjectReportInnerLayout from "./Partials/StudentSubjectReport/StudentSubjectReportInnerLayout";

export default function StudentSubjectReport({
    auth,
    siteData,
    classrooms,
    students,
    getStudentData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Student Subject Report
                </h2>
            }
        >
            <Head title="Student Subject Report" />

            <StudentSubjectReportInnerLayout
                classrooms={classrooms}
                students={students}
                getStudentData={getStudentData}
            />
        </DashboardLayout>
    );
}
