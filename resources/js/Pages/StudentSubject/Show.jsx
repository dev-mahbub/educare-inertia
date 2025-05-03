import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import StudentSubjectInnerLayout from "../StudentSubject/Partials/StudentSubjectInnerLayout";

export default function Show({
    auth,
    siteData,
    studentData,
    classrooms,
    studentNames,
    studentSubjects,
    selected_subject_ids,
    subject_numbers,
    students,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Assign subject to student
                </h2>
            }
        >
            <Head title="Assign subject to student" />

            <StudentSubjectInnerLayout
                studentData={studentData}
                classrooms={classrooms}
                studentNames={studentNames}
                studentSubjects={studentSubjects}
                selected_subject_ids={selected_subject_ids}
                subject_numbers={subject_numbers}
                students={students}
            />
        </DashboardLayout>
    );
}
