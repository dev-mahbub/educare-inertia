import DashboardLayout from '@/Layouts/DashboardLayout';
import EventPreviewInnerLayout from '@/Pages/Event/Partials/Preview/EventPreviewInnerLayout';
import { Head } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Preview({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    eventData
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Event Preview" />
            <EventPreviewInnerLayout
                eventData={eventData}
            />
        </DashboardLayout>
    );
}
