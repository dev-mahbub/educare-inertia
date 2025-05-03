import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentMisReportInnerLayout from './Partials/MisReport/StudentMisReportInnerLayout';

export default function MisReport({ auth,
    siteData,
    getStudentCounts,
    transportCounts,
    getClassroomsWithStudentCount,
    getHouseWiseStudent,
    getReligionWiseStudent,
    getTotalStudentPerSession,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Main</h2>}
        >
            <Head title="Fee Main" />

            <StudentMisReportInnerLayout
                getStudentCounts = {getStudentCounts}
                transportCounts = {transportCounts}
                getClassroomsWithStudentCount = {getClassroomsWithStudentCount}
                getHouseWiseStudent  = {getHouseWiseStudent}
                getReligionWiseStudent = {getReligionWiseStudent}
                getTotalStudentPerSession = {getTotalStudentPerSession}
            />
        </DashboardLayout>
    );
}
