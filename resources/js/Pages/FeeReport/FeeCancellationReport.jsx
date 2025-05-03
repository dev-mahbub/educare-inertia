import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeCancellationReportInnerLayout from './Partials/FeeCancellationReport/FeeCancellationReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function FeeCancellationReport({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    students,
    cancellationReports,
    student
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Cancellation Report</h2>}
        >
            <Head title="Fee Cancellation Report" />

            <FeeCancellationReportInnerLayout
                classrooms={classrooms}
                students={students}
                cancellationReports={cancellationReports}
                student={student}
            />
        </DashboardLayout>
    );
}
