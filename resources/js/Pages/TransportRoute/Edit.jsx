import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditRouteInnerLayout from './Partials/Route/Edit/EditRouteInnerLayout';

export default function Edit({ auth,siteData, vehicles, teachers, routeId, routes }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Route</h2>}
        >
            <Head title="Edit Route" />
            
            <EditRouteInnerLayout 
                vehicles = {vehicles}
                teachers = {teachers}
                routeId = {routeId}
                routes = {routes}
                
            />
        </DashboardLayout>
    );
}
