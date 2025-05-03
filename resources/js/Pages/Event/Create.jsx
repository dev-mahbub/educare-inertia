import DashboardLayout from '@/Layouts/DashboardLayout';
import EventFromInnerLayout from '@/Pages/Event/Partials/Create/EventFromInnerLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    eventTypes,
    eventLevels
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create Event" />
            <EventFromInnerLayout
                eventTypes={eventTypes}
                eventLevels={eventLevels}
            />
        </DashboardLayout>
    );
}
