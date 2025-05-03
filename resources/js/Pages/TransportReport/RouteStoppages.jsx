import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RouteStoppagesInnerLayout from './Partials/RouteStoppages/RouteStoppagesInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RouteStoppages({ auth, siteData, routeStoppages }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Route Stoppages</h2>}
        >
            <Head title="Route Stoppages" />

            <RouteStoppagesInnerLayout routeStoppages={routeStoppages} />
        </DashboardLayout>
    );
}
