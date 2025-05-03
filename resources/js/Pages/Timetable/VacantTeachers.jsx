import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import VacantTeacherInnerLayout from './Partials/VacantTeacher/VacantTeacherInnerLayout';

export default function VacantTeachers({
    auth,
    siteData,
    schoolShifts,
    schoolPeriods,
    currentDate,
    teachers
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vacant Teacher</h2>}
        >
            <Head title="Vacant Teacher" />

            <VacantTeacherInnerLayout
                schoolShifts={schoolShifts}
                schoolPeriods={schoolPeriods}
                currentDate={currentDate}
                teachers={teachers}
            />
        </DashboardLayout>
    );
}
