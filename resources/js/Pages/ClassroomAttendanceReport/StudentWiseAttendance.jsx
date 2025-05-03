import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentWiseAttendanceInnerLayout from './Pertials/StudentWiseAttendance/StudentWiseAttendanceInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentWiseAttendance({
    auth,
    siteData,
    classrooms,
    students,
    attendanceByMonth,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Wise Attendance</h2>}
        >
            <Head title="Student Wise Attendance" />

            <StudentWiseAttendanceInnerLayout
                classrooms={classrooms}
                students={students}
                attendanceByMonth={attendanceByMonth}
            />
        </DashboardLayout>
    );
}
