import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EwsReportInnerLayout from './Partials/EwsReport/EwsReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EwsReport({ auth, siteData, mustVerifyEmail, status, schools, classrooms, ewsReports }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ews Report</h2>}
        >
            <Head title="Ews Report" />

            <EwsReportInnerLayout
                classrooms={classrooms}
                ewsReports={ewsReports}
            />
        </DashboardLayout>
    );
}
