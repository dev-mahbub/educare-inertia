import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddVehicleStaffInnerLayout from './Partials/VehicleStaff/AddVehicleStaffInnerLayout';

export default function Edit({ auth, siteData, driverType, driverProofType, status, genderArr, drivers, states }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vehicle Staff</h2>}
        >
            <Head title="Vehicle Staff" />

            <AddVehicleStaffInnerLayout
                driverType={driverType}
                driverProofType={driverProofType}
                status={status}
                genderArr={genderArr}
                drivers={drivers}
                states={states}
            />
        </DashboardLayout>
    );
}
