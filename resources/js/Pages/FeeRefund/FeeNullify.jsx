import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NullifyFeeInnerLayout from './Partials/NullifyFee/NullifyFeeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function FeeNullify({ auth, siteData, mustVerifyEmail, status, schools, classrooms, students, student, studentFeeStructure }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Nullify</h2>}
        >
            <Head title="Fee Nullify" />

            <NullifyFeeInnerLayout
                classrooms={classrooms}
                students={students}
                student={student}
                studentFeeStructure={studentFeeStructure}
            />
        </DashboardLayout>
    );
}
