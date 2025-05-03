import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AttendanceListInnerLayout from './Partials/AttendanceList/AttendanceListInnerLayout';

export default function AttendanceList({ auth, siteData, students, studentId, monthlyReport }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attendance List</h2>}
        >
            <Head title="Student Attendance List" />

            <AttendanceListInnerLayout
                students={students}
                studentId={studentId}
                monthlyReport={monthlyReport}
            />
        </DashboardLayout>
    );
}
