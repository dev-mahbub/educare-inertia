import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddNewVehicleInnerLayout from './Partials/NewVehicle/AddNewVehicleInnerLayout';

export default function Edit({
    auth,
    siteData,
    vehicles,
    drivers,
    conductors,
    providers
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Vehicle</h2>}
        >
            <Head title="Add New Vehicle" />

            <AddNewVehicleInnerLayout
                vehicles={vehicles}
                drivers={drivers}
                conductors={conductors}
                providers={providers}
            />
        </DashboardLayout>
    );
}
