import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditVehicleStaffInnerLayout from './Partials/VehicleStaff/EditVehicleStaffInnerLayout';

const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, driverType, driverProofType, status, genderArr, drivers,driverId}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Vehicle Staff</h2>}
        >
            <Head title="Edit Vehicle Staff" />

            <EditVehicleStaffInnerLayout 
                driverType={driverType}
                driverProofType={driverProofType}
                status={status}
                genderArr={genderArr}
                drivers={drivers}
                driverId={driverId}
            />
        </DashboardLayout>
    );
}