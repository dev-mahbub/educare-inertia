import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import StudentSubjectWiseReportInnerLayout from "./Partials/StudentSubjectWiseReport/StudentSubjectWiseReportInnerLayout";

export default function StudentSubjectWiseReport({
    auth,
    siteData,
    subjects,
    classrooms,
    students,
    student,
    studentSubjectWiseRepo
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Student Subject Wise Report
                </h2>
            }
        >
            <Head title="Student Subject Wise Report" />

            <StudentSubjectWiseReportInnerLayout
                subjects={subjects}
                classrooms={classrooms}
                students={students}
                student={student}
                studentSubjectWiseRepo={studentSubjectWiseRepo}
            />
        </DashboardLayout>
    );
}
