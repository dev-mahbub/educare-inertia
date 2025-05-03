import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import InboxListInnerLayout from './Partials/Sent/SentWebMessageListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({ auth, siteData, mustVerifyEmail, classrooms, webmessages }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Web Message Sent" />
            <InboxListInnerLayout classrooms={classrooms} webmessages={webmessages}  />
        </DashboardLayout>
    );
}