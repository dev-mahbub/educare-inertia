import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import TakeAttendanceInnerLayout from "./Partials/TakeAttendance/TakeAttendanceInnerLayout";
const match = "";
const updateIcon = "";
const deleteIcon = "";

export default function TakeAttendance({
    auth,
    siteData,
    classrooms,
    students,
    absentStudents,
    presentStudents,
    classroomAttendances,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Take Attendance
                </h2>
            }
        >
            <Head title="Take Attendance" />

            <TakeAttendanceInnerLayout
                classrooms={classrooms}
                students={students}
                absentStudents={absentStudents}
                presentStudents={presentStudents}
                classroomAttendances={classroomAttendances}
            />
        </DashboardLayout>
    );
}
