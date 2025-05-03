import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UpdateStudentFeeGroupInnerLayout from './Partials/Master/UpdateStudentFeeGroup/UpdateStudentFeeGroupInnerLayout';

export default function UpdateFeeToStudent({ auth, siteData, mustVerifyEmail, status, classrooms, studentFeeInstallments, students, feeStructureLists }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Student Fee Group</h2>}
        >
            <Head title="Update Student Fee Group" />

            <UpdateStudentFeeGroupInnerLayout classrooms={classrooms} studentFeeInstallments={studentFeeInstallments} students={students} feeStructureLists={feeStructureLists} />
        </DashboardLayout>
    );
}
