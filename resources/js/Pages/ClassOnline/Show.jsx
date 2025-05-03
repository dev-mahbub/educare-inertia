import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ScheduledClassListInnerLayout from './Partials/OnlineClass/ScheduledClassListInnerLayout';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    online_classes,
    classrooms,
    subjects
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Scheduled Class List</h2>}
        >
            <Head title="Scheduled Class List" />

            <ScheduledClassListInnerLayout
                online_classes={online_classes}
                classrooms={classrooms}
                subjects={subjects}
            />
        </DashboardLayout>
    );
}
