import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllotmentInnerLayout from './Partials/Allotment/AllotmentInnerLayout';

export default function Allotment({
    auth,
    siteData,
    currentDate,
    schoolShifts,
    schoolPeriods,
    classNames,
    timetables
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Today Allotment</h2>}
        >
            <Head title="Today Allotment" />

            <AllotmentInnerLayout
                currentDate={currentDate}
                schoolShifts={schoolShifts}
                schoolPeriods={schoolPeriods}
                classNames={classNames}
                timetables={timetables}
            />
        </DashboardLayout>
    );
}
