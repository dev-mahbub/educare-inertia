import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentTimetableInnerLayout from './Partials/StudentTimetable/StudentTimetableInnerLayout';

export default function StudentTimetable({
    auth,
    siteData,
    classrooms,
    students,
    schoolShifts,
    classroomPeriods,
    timetables
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Timetable</h2>}
        >
            <Head title="Student Timetable" />

            <StudentTimetableInnerLayout
                classrooms={classrooms}
                schoolShifts={schoolShifts}
                classroomPeriods={classroomPeriods}
                timetables={timetables}
                students={students}
            />
        </DashboardLayout>
    );
}
