import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateTopicInnerLayout from './Partials/CreateTopicInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, topics, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Topics</h2>}
        >
            <Head title="Topics" />
            <CreateTopicInnerLayout topics={topics}  />
        </DashboardLayout>
    );
}