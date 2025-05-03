import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NullifyFeeReportInnerLayout from './Partials/NullifyFeeReport/NullifyFeeReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function FeeNullifyReport({ auth, siteData, mustVerifyEmail, status, schools, nullifyFeeReports }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Nullify Report</h2>}
        >
            <Head title="Fee Nullify Report" />

            <NullifyFeeReportInnerLayout nullifyFeeReports={nullifyFeeReports} />
        </DashboardLayout>
    );
}
