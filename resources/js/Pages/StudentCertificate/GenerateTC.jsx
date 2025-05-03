import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import GenerateTcInnerLayout from './Partials/GenerateTc/GenerateTcInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function GenerateTC({
    auth,
    siteData,
    classrooms,
    students,
    student,
    feeInstallments
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generate TC</h2>}
        >
            <Head title="Generate TC" />

            <GenerateTcInnerLayout
                classrooms={classrooms}
                students={students}
                student={student}
                feeInstallments={feeInstallments}
            />
        </DashboardLayout>
    );
}
