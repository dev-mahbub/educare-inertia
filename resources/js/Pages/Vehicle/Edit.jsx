import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditVehicleInnerLayout from './Partials/EditVehicle/EditVehicleInnerLayout';

export default function Edit({ auth, siteData, vehicleId, vehicles, drivers, conductors,providers, }) {

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit New Vehicle</h2>}
        >
            <Head title="Edit New Vehicle" />
            <EditVehicleInnerLayout
                vehicleId = {vehicleId}
                vehicles = {vehicles}
                drivers = {drivers}
                conductors = {conductors}
                providers = {providers}
            />
            <div>Edit</div>
        </DashboardLayout>
    );
}