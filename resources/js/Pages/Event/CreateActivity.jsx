import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateActivityInnerLayout from './Partials/CreateActivity/CreateActivityInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CreateActivity({
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
            <Head title="Create Event Activity" />
            <CreateActivityInnerLayout
                eventData={eventData}
            />
        </DashboardLayout>
    );
}
