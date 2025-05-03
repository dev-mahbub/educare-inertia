import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ConsolidatedDueReportInnerLayout from './Partials/ConsolidatedDueReport/ConsolidatedDueReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ConsolidatedDuesReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    fees,
    feeCategories,
    student_status_array,
    consolidatedDueReports
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Consolidated Dues Report</h2>}
        >
            <Head title="Fee Consolidated Dues Report" />

            <ConsolidatedDueReportInnerLayout
                fees={fees}
                feeCategories={feeCategories}
                student_status_array={student_status_array}
                consolidatedDueReports={consolidatedDueReports}
            />
        </DashboardLayout>
    );
}
