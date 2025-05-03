import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignFeeStudentInnerLayout from './Partials/Master/AssignFeeStudent/AssignFeeStudentInnerLayout';

export default function AssignFeeToStudent({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    employmentCategoryTypes,
    feeStructures,
    studentsWithFeeStructure,
    classFeeStructure
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assign Fee Group To Students</h2>}
        >
            <Head title="Assign Fee Group To Students" />

            <AssignFeeStudentInnerLayout
                classrooms={classrooms}
                employmentCategoryTypes={employmentCategoryTypes}
                feeStructures={feeStructures}
                studentsWithFeeStructure={studentsWithFeeStructure}
                classFeeStructure={classFeeStructure}
            />
        </DashboardLayout>
    );
}
