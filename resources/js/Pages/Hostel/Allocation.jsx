import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AllocationInnerLayout from './Partials/Allocation/AllocationInnerLayout';

export default function Allocation({
    auth,
    siteData,
    classrooms,
    students,
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
    studentBedDetails,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Allocation</h2>}
        >
            <Head title="Allocation" />

            <AllocationInnerLayout
                classrooms={classrooms}
                students={students}
                infraLevels={infraLevels}
                childLevels={childLevels}
                infraLavelIds={infraLavelIds}
                infraLavelIdString={infraLavelIdString}
                currentLavelId={currentLavelId}
                is_open={is_open}
                type={type}
                studentBedDetails={studentBedDetails}
            />
        </DashboardLayout>
    );
}
