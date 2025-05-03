import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import OutstandingDueReportInnerLayout from './Partials/OutstandingDueReport/OutstandingDueReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function OutstandingDueSummary({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classNames,
    classrooms,
    fees,
    feeCategories,
    feeStructures,
    student_status_array,
    classDueReports,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Outstanding Due Summary</h2>}
        >
            <Head title="Fee Outstanding Due Summary" />

            <OutstandingDueReportInnerLayout
                classNames={classNames}
                classrooms={classrooms}
                fees={fees}
                feeCategories={feeCategories}
                feeStructures={feeStructures}
                student_status_array={student_status_array}
                classDueReports = {classDueReports}
            />
        </DashboardLayout>
    );
}
