import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UpdateFeeStructureInnerLayout from './Partials/Master/UpdateFeeStructure/UpdateFeeStructureInnerLayout';

export default function UpdateClassFeeStructure({ auth, siteData, mustVerifyEmail, classrooms, status, fees, feeTypes, studentFeeStructure, students, student }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Student Fee Structure</h2>}
        >
            <Head title="Update Student Fee Structure" />

            <UpdateFeeStructureInnerLayout
                classrooms={classrooms}
                fees={fees}
                feeTypes={feeTypes}
                studentFeeStructure={studentFeeStructure}
                students={students}
                student={student}
            />
        </DashboardLayout>
    );
}
