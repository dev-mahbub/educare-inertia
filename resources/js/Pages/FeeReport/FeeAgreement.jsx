import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeAgreementInnerLayout from './Partials/FeeAgreement/FeeAgreementInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function FeeAgreement({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    students,
    student,
    student_status_array,
    guardian_array
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Agreement</h2>}
        >
            <Head title="Fee Agreement" />

            <FeeAgreementInnerLayout
                classrooms={classrooms}
                students={students}
                student={student}
                student_status_array={student_status_array}
                guardian_array={guardian_array}
            />
        </DashboardLayout>
    );
}
