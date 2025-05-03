import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DriverLogBookInnerLayout from './Partials/DriverLogBook/DriverLogBookInnerLayout';

export default function DriversLogBook({
    auth,
    siteData,
    stoppageData,
    vehicleData,
    driverLogBooks,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Drivers Log Book</h2>}
        >
            <Head title="Drivers Log Book" />

            <DriverLogBookInnerLayout
                stoppageData={stoppageData}
                vehicleData={vehicleData}
                driverLogBooks={driverLogBooks}
            />
        </DashboardLayout>
    );
}
