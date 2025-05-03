import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateJobInnerLayout from './Partials/Create/CreateJobInnerLayout';
import ListJobInnerLayout from './Partials/List/ListJobInnerLayout';

export default function Show({ auth, siteData, jobs }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Job list" />

            <ListJobInnerLayout
                jobs={jobs}
            />
        </DashboardLayout>
    );
}
