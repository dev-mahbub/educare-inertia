import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateSchoolPeriodInnerLayout from './Partials/CreateSchoolPeriodInnerLayout';

export default function Create({
    auth,
    siteData,
    schoolShifts,
    schoolPeriods
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">School Period</h2>}
        >
            <Head title="School Period" />

            <CreateSchoolPeriodInnerLayout
                schoolShifts={schoolShifts}
                schoolPeriods={schoolPeriods}
            />
        </DashboardLayout>
    );
}
