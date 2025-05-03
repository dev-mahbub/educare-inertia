import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DriverLogBookReportInnerLayout from './Partials/DriverLogBookReport/DriverLogBookReportInnerLayout';

export default function DriverLogBookReport({
    auth,
    siteData,
    vehicleData,
    driverLogBooks,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Driver Log Book Report</h2>}
        >
            <Head title="Driver Log Book Report" />

            <DriverLogBookReportInnerLayout
                vehicleData={vehicleData}
                driverLogBooks={driverLogBooks}
            />
        </DashboardLayout>
    );
}
