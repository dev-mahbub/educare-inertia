import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegSourceReportInnerLayout from './Partials/Enquiry/RegSource/RegSourceReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function RegistrationSourceReport({
    auth,
    siteData,
    registrationByReport,
    sourceByReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration & Source By Report</h2>}
        >
            <Head title="Registration & Source By Report" />

            <RegSourceReportInnerLayout
                registrationByReport={registrationByReport}
                sourceByReport={sourceByReport}
            />

            {/* <AddNewVehicleInnerLayout /> */}
            {/* <AddNewAreaInnerLayout /> */}
            {/* <AddVehicleStaffInnerLayout/> */}
        </DashboardLayout>
    );
}
