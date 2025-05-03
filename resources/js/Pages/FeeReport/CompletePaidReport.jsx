import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CompletePaidReportInnerLayout from './Partials/CompletePaidReport/CompletePaidReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CompletePaidReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    fees,
    classrooms,
    completePaidReport
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Complete Paid Report</h2>}
        >
            <Head title="Fee Complete Paid Report" />

            <CompletePaidReportInnerLayout
                fees={fees}
                classrooms={classrooms}
                completePaidReport={completePaidReport}
            />
        </DashboardLayout>
    );
}
