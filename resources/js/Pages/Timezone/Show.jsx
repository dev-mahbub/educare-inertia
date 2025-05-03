import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateTimezoneInnerLayout from './Partials/CreateTimezoneInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, timezones, timezone_array, status , message }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Timezone</h2>}
        >
            <Head title="Timezone" />

            <CreateTimezoneInnerLayout 
            timezones={timezones}
            timezone_array={timezone_array}
            />
        </DashboardLayout>
    );
}