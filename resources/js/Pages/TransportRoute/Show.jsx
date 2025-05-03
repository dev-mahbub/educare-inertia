import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NewRouteInnerLayout from './Partials/Route/Create/NewRouteInnerLayout';

export default function Edit({
    auth,
    siteData,
    vehicles,
    teachers,
    vehicle_no
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Route</h2>}
        >
            <Head title="Add New Route" />

            <NewRouteInnerLayout
                vehicles={vehicles}
                teachers={teachers}
                vehicle_no={vehicle_no}
            />
        </DashboardLayout>
    );
}
