import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassOnlineAttendanceInnerLayout from './Partials/ClassOnlineAttendanceInnerLayout';

export default function Show({
    auth,
    siteData,
    classrooms,
    subjects,
    studentAttendances,
    currentDate
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classroom</h2>}
        >
            <Head title="Classroom" />
            <ClassOnlineAttendanceInnerLayout
                classrooms={classrooms}
                subjects={subjects}
                studentAttendances={studentAttendances}
                currentDate={currentDate}
            />
        </DashboardLayout>
    );
}
