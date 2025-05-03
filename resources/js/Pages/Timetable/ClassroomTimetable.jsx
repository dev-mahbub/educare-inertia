import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassroomTimetableInnerLayout from './Partials/ClassroomTimetable/ClassroomTimetableInnerLayout';

export default function ClassroomTimetable({
    auth,
    siteData,
    classrooms,
    schoolShifts,
    classroomPeriods,
    timetables
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class Timetable</h2>}
        >
            <Head title="Class Timetable" />

            <ClassroomTimetableInnerLayout
                classrooms={classrooms}
                schoolShifts={schoolShifts}
                classroomPeriods={classroomPeriods}
                timetables={timetables}
            />
        </DashboardLayout>
    );
}
