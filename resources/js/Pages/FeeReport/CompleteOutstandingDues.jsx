import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CompleteOutstandingDuesInnerLayout from './Partials/CompleteOutstandingDues/CompleteOutstandingDuesInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CompleteOutstandingDues({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    fees,
    completeOutstandingDueReports,
    student_status_array,
    student_active_status_array,
    employmentCategoryTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Complete Outstanding Dues</h2>}
        >
            <Head title="Fee Complete Outstanding Dues" />

            <CompleteOutstandingDuesInnerLayout
                classrooms={classrooms}
                fees={fees}
                completeOutstandingDueReports={completeOutstandingDueReports}
                student_status_array={student_status_array}
                student_active_status_array={student_active_status_array}
                employmentCategoryTypes={employmentCategoryTypes}
            />
        </DashboardLayout>
    );
}
