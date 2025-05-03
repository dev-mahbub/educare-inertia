import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EventListInnerLayout from './Partials/List/EventListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    eventStatusArr,
    eventTypes,
    academicYears,
    events
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Events List" />
            <EventListInnerLayout
                eventStatusArr={eventStatusArr}
                eventTypes={eventTypes}
                academicYears={academicYears}
                events={events}
            />
        </DashboardLayout>
    );
}
