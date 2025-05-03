import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClearanceReportInnerLayout from './Partials/Cheque/ClearanceReport/ClearanceReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ClearanceReport({ auth, siteData, mustVerifyEmail, status, schools, chequeClearanceReports }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cheque Clearance Report</h2>}
        >
            <Head title="Cheque Clearance Report" />

            <ClearanceReportInnerLayout chequeClearanceReports={chequeClearanceReports} />
        </DashboardLayout>
    );
}
