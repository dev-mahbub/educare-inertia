import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateClassInnerLayout from './Partials/CreateClassInnerLayout';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    classrooms,
    subjects,
    dayTitles,
    shiftTypes
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Timetable" />

            <CreateClassInnerLayout
                classrooms={classrooms}
                subjects={subjects}
                dayTitles={dayTitles}
                shiftTypes={shiftTypes}
            />
        </DashboardLayout>
    );
}
