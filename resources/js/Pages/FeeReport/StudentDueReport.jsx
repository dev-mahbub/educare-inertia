import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentDueReportInnerLayout from './Partials/StudentDueReport/StudentDueReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentDueReport({
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
    studentDueReports,
    classroom
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Due Summary</h2>}
        >
            <Head title="Student Due Summary" />

            <StudentDueReportInnerLayout
                classNames={classNames}
                classrooms={classrooms}
                fees={fees}
                feeCategories={feeCategories}
                feeStructures={feeStructures}
                student_status_array={student_status_array}
                studentDueReports = {studentDueReports}
                classroom = {classroom}
            />
        </DashboardLayout>
    );
}
