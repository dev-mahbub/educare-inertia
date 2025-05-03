import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateClassPeriodInnerLayout from './Partials/CreateClassPeriodInnerLayout';

export default function Create({
    auth,
    siteData,
    schoolShifts,
    schoolPeriods,
    classrooms,
    classroomPeriods
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class Period</h2>}
        >
            <Head title="Class Period" />

            <CreateClassPeriodInnerLayout
                schoolShifts={schoolShifts}
                schoolPeriods={schoolPeriods}
                classrooms={classrooms}
                classroomPeriods={classroomPeriods}
            />
        </DashboardLayout>
    );
}
