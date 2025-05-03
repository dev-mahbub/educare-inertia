import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EventDetailsInnerLayout from './Partials/Details/EventDetailsInnerLayout';

export default function Create({
    auth,
    siteData,
    eventData,
    staffRoles,
    classGroups,
    staffs,
    fileTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
        >
            <Head title="Events Details" />
            <EventDetailsInnerLayout
                eventData={eventData}
                staffRoles={staffRoles}
                classGroups={classGroups}
                staffs={staffs}
                fileTypes={fileTypes}
            />
        </DashboardLayout>
    );
}
