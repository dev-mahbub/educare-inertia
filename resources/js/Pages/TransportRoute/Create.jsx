import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NewRouteInnerLayout from './Partials/Route/Create/NewRouteInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, timezones, countries, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Route</h2>}
        >
            <Head title="Add New Route" />
            
            <NewRouteInnerLayout />
        </DashboardLayout>
    );
}
