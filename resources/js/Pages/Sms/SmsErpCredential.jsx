import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SmsErpCredentialInnerLayout from './Partials/SmsErpCredential/SmsErpCredentialInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    audienceTypes,
    classrooms,
    students,
    teachers,
    boardingTypes,
    alumnies,
    vehicleStaffs
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Sms" />
            <SmsErpCredentialInnerLayout
                audienceTypes={audienceTypes}
                classrooms={classrooms}
                students={students}
                teachers={teachers}
                boardingTypes={boardingTypes}
                alumnies={alumnies}
                vehicleStaffs={vehicleStaffs}
            />
        </DashboardLayout>
    );
}
