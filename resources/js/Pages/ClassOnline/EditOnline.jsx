import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditOnlineClassInnerLayout from './Partials/OnlineClass/EditOnlineClassInnerLayout';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    online_class,
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
            <Head title="Edit Online Class" />

            <EditOnlineClassInnerLayout
                online_class={online_class}
                classrooms={classrooms}
                subjects={subjects}
                dayTitles={dayTitles}
            />
        </DashboardLayout>
    );
}
