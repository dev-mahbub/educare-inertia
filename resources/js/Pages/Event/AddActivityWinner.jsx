import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddActivityWinnerInnerLayout from './Partials/AddActivityWinner/AddActivityWinnerInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AddActivityWinner({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    eventData,
    eventActivity,
    participants
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit Event Activity" />
            <AddActivityWinnerInnerLayout
                eventData={eventData}
                eventActivity={eventActivity}
                participants={participants}
            />
        </DashboardLayout>
    );
}
