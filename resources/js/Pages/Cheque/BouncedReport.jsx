import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BouncedChequeReportInnerLayout from './Partials/Cheque/BouncedChequeReport/BouncedChequeReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function BouncedReport({ auth, siteData, mustVerifyEmail, status, schools, bouncedChequeReports }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bounced Cheque Report</h2>}
        >
            <Head title="Bounced Cheque Report" />

            <BouncedChequeReportInnerLayout bouncedChequeReports={bouncedChequeReports}/>
        </DashboardLayout>
    );
}
