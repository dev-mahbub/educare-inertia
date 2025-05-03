import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditJobInnerLayout from './Partials/Edit/EditJobInnerLayout';

export default function Edit({ auth, siteData, genders, statues, job }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit job" />

            <EditJobInnerLayout
                genders={genders}
                statues={statues}
                job={job}
            />
        </DashboardLayout>
    );
}
