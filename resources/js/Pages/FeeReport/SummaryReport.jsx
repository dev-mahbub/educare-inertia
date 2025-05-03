import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeSummaryReportInnerLayout from './Partials/FeeSummaryReport/FeeSummaryReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function SummaryReport({ 
    auth, 
    siteData, 
    mustVerifyEmail, 
    status, 
    schools,
    classrooms,
    fees,
    feeCategories,
    feeSummaryReport
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Summary Report</h2>}
        >
            <Head title="Fee Summary Report" />

            <FeeSummaryReportInnerLayout
                fees={fees}
                classrooms={classrooms}
                feeCategories={feeCategories}
                feeSummaryReport={feeSummaryReport}
            />
        </DashboardLayout>
    );
}
