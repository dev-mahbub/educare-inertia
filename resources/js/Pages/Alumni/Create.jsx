import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateInnerLayout from './Partials/Create/CreateInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, timezones, countries, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create</h2>}
        >
            <Head title="Create" />
            
             <CreateInnerLayout/>
        </DashboardLayout>
    );
}
