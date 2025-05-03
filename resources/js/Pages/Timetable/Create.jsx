import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateTimetableInnerLayout from './Partials/CerateTimeTable/CreateTimetableInnerLayout';

export default function Create({
    auth,
    siteData,
    classrooms,
    schoolShifts,
    classroomPeriods,
    timetableDays,
    subjects,
    teachers
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Timetable</h2>}
        >
            <Head title="Create Timetable" />

            <CreateTimetableInnerLayout
                classrooms={classrooms}
                schoolShifts={schoolShifts}
                classroomPeriods={classroomPeriods}
                timetableDays={timetableDays}
                subjects={subjects}
                teachers={teachers}
            />
        </DashboardLayout>
    );
}
