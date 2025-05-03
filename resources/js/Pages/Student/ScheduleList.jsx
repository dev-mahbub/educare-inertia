import DashboardLayout from '@/Layouts/DashboardLayout';

import { Head } from '@inertiajs/react';
import ExamScheduleInnerLayout from './Partials/ExamSchedule/ExamScheduleInnerLayout';

export default function ScheduleList({ auth, siteData, mustVerifyEmail, status, schools, students, studentId, examSchedule, examScheduleDetails }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Exam Schedules List</h2>}
        >
            <Head title="Exam Schedules List" />

            <ExamScheduleInnerLayout examSchedule={examSchedule} students={students} studentId={studentId} examScheduleDetails={examScheduleDetails} />
        </DashboardLayout>
    );
}