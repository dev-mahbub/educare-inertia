import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherTimetableInnerLayout from './Partials/TeacherTimetable/TeacherTimetableInnerLayout';

export default function TeacherTimetable({
    auth,
    siteData,
    teachers,
    schoolShifts,
    schoolPeriods,
    timetables
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class Timetable</h2>}
        >
            <Head title="Class Timetable" />

            <TeacherTimetableInnerLayout
                teachers={teachers}
                schoolShifts={schoolShifts}
                schoolPeriods={schoolPeriods}
                timetables={timetables}
            />
        </DashboardLayout>
    );
}
