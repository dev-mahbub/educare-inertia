import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditActivityInnerLayout from './Partials/EditActivity/EditActivityInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditActivity({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    eventData,
    eventActivity
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit Event Activity" />
            <EditActivityInnerLayout
                eventData={eventData}
                eventActivity={eventActivity}
            />
        </DashboardLayout>
    );
}
