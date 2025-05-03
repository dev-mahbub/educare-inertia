import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TrackYourVehicleInnerLayour from './Partials/TrackYourVehicle/TrackYourVehicleInnerLayour';

export default function TrackYourVehicle({ auth, siteData, vehicleDetails }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Track Your Vehicle</h2>}
        >
            <Head title="Track Your Vehicle" />

            <TrackYourVehicleInnerLayour
                vehicleDetails={vehicleDetails}
            />
        </DashboardLayout>
    );
}
