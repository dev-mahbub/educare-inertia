import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AdjustFeeInnerLayout from './Partials/AdjustFee/AdjustFeeInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AdjustFee({
    auth,
    siteData,
    classrooms,
    students,
    studentFeeInstallments,
    student
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Adjust Fee</h2>}
        >
            <Head title="Adjust Fee" />

            <AdjustFeeInnerLayout
                classrooms={classrooms}
                students={students}
                student={student}
                studentFeeInstallments={studentFeeInstallments}
            />
        </DashboardLayout>
    );
}
