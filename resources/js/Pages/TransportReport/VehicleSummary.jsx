import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import VehicleSummaryInnerLayout from './Partials/VehicleSummary/VehicleSummaryInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function VehicleSummary({
    auth,
    siteData,
    routeDetails,
    studentData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vehicle Summary</h2>}
        >
            <Head title="Vehicle Summary" />

            <VehicleSummaryInnerLayout
                routeDetails={routeDetails}
                studentData={studentData}
            />
        </DashboardLayout>
    );
}
