import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SetStudentWorkingInnerLayout from "./Partials/SetStudentWorking/SetStudentWorkingInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function SetStudentWorking({
    auth,
    siteData,
    studentDetails,
    academicSession,
    monthArr,
    classNames,
    classrooms,
    academicYearId,
    monthId,
    classId,
    classroomId,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Set Student Working
                </h2>
            }
        >
            <Head title="Set Student Working" />

            <SetStudentWorkingInnerLayout
                studentDetails={studentDetails}
                academicSession={academicSession}
                monthArr={monthArr}
                classNames={classNames}
                classrooms={classrooms}
                academicYearId={academicYearId}
                monthId={monthId}
                classId={classId}
                classroomId={classroomId}
            />
        </DashboardLayout>
    );
}
