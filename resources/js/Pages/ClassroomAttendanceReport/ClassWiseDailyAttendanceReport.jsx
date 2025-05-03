import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassWiseDailyAttendanceReportInnerLayout from './Pertials/ClassWiseDailyAttendanceReport/ClassWiseDailyAttendanceReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ClassWiseDailyAttendanceReport({
    auth,
    siteData,
    classWiseAttendance,
    totalStudentsSum,
    presentCountSum,
    absentCountSum,
    leaveCountSum,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class Wise Daily Attendance Report</h2>}
        >
            <Head title="Class Wise Daily Attendance Report" />

            <ClassWiseDailyAttendanceReportInnerLayout
                classWiseAttendance={classWiseAttendance}
                totalStudentsSum={totalStudentsSum}
                presentCountSum={presentCountSum}
                absentCountSum={absentCountSum}
                leaveCountSum={leaveCountSum}
            />
        </DashboardLayout>
    );
}
