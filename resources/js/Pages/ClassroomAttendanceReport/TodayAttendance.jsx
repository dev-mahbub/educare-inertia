import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TodayAttendanceInnerLayout from './Pertials/TodayAttendance/TodayAttendanceInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TodayAttendance({
    auth,
    siteData,
    getTodayAttendanceClassroom,
    classrooms,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Today Attendance</h2>}
        >
            <Head title="Today Attendance" />

            <TodayAttendanceInnerLayout
                getTodayAttendanceClassroom={getTodayAttendanceClassroom}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
