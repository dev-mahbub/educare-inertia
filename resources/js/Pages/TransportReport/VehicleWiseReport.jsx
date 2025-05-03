import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import VehicleReportInnerLayout from './Partials/VehicleReport/VehicleReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function VehicleWiseReport({
    auth,
    siteData,
    studentData,
    teacherData,
    vehicleData,
    routeData,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Vehicle Wise Report</h2>}
        >
            <Head title="Vehicle Wise Report" />

            <VehicleReportInnerLayout
                studentData={studentData}
                teacherData={teacherData}
                vehicleData={vehicleData}
                routeData={routeData}
            />
        </DashboardLayout>
    );
}
