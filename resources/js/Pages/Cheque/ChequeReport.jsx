import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ChequeReportInnerLayout from './Partials/Cheque/ChequeReport/ChequeReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ChequeReport({ auth, siteData, mustVerifyEmail, status, schools, chequeDateReports }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cheque Date Report</h2>}
        >
            <Head title="Cheque Date Report" />

            <ChequeReportInnerLayout chequeDateReports={chequeDateReports} />
        </DashboardLayout>
    );
}
