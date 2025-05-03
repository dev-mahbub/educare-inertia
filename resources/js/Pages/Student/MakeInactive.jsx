import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MakeInactiveInnerLayout from './Partials/MakeInactive/MakeInactiveInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function MakeInactive({
    auth,
    siteData,
    classrooms,
    students,
    classroomId,
    student,
    feeInstallments
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Make Inactive</h2>}
        >
            <Head title="Make Inactive" />

            <MakeInactiveInnerLayout
                classrooms={classrooms}
                students={students}
                classroomId={classroomId}
                student={student}
                feeInstallments={feeInstallments}
            />
        </DashboardLayout>
    );
}
