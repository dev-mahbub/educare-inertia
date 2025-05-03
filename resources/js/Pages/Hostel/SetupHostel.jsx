import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SetupHostelInnerLayout from './Partials/SetupHostel/SetupHostelInnerLayout';

export default function SetupHostel({
    auth,
    siteData,
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
    hostelStaffArr,
    teacherData,
    hostelStaffDetails,
    roomTypeData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Setup Hostel</h2>}
        >
            <Head title="Setup Hostel" />

            <SetupHostelInnerLayout
                infraLevels={infraLevels}
                childLevels={childLevels}
                infraLavelIds={infraLavelIds}
                infraLavelIdString={infraLavelIdString}
                currentLavelId={currentLavelId}
                is_open={is_open}
                type={type}
                hostelStaffArr={hostelStaffArr}
                teacherData={teacherData}
                hostelStaffDetails={hostelStaffDetails}
                roomTypeData={roomTypeData}
            />
        </DashboardLayout>
    );
}
