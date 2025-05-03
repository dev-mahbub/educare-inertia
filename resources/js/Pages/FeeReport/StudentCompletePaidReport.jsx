import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentCompletePaidReportInnerLayout from './Partials/StudentCompletePaidReport/StudentCompletePaidReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentCompletePaidReport({
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

            <StudentCompletePaidReportInnerLayout
                fees={fees}
                classrooms={classrooms}
                completePaidReport={completePaidReport}
            />
        </DashboardLayout>
    );
}
