import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateOnlineClassInnerLayout from './Partials/OnlineClass/CreateOnlineClassInnerLayout';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    classrooms,
    subjects,
    dayTitles
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create Online Class" />

            <CreateOnlineClassInnerLayout
                classrooms={classrooms}
                subjects={subjects}
                dayTitles={dayTitles}
            />
        </DashboardLayout>
    );
}
