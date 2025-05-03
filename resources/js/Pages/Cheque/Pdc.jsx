import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeePDCInnerLayout from './Partials/Cheque/FeePDC/FeePDCInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Pdc({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    students,
    cheques,
    banks,
    student
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee PDC</h2>}
        >
            <Head title="Fee PDC" />

            <FeePDCInnerLayout
                classrooms={classrooms}
                students={students}
                cheques={cheques}
                banks={banks}
                student={student}
            />
        </DashboardLayout>
    );
}
