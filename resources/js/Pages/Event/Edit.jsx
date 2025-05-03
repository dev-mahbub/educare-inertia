import DashboardLayout from '@/Layouts/DashboardLayout';
import EventFromInnerLayout from '@/Pages/Event/Partials/Edit/EventFromInnerLayout';
import { Head } from '@inertiajs/react';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    timezones,
    countries,
    states,
    status,
    eventTypes,
    eventLevels,
    eventData
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit Event" />
            <EventFromInnerLayout
                eventTypes={eventTypes}
                eventLevels={eventLevels}
                eventData={eventData}
            />
        </DashboardLayout>
    );
}
