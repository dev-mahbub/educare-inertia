import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherCertificateInnerLayout from './Partials/TeacherCertificate/TeacherCertificateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeacherCertificate({
    auth,
    siteData,
    teacherNames,
    certificates,
    idCardCertificates
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Certificate</h2>}
        >
            <Head title="Teacher Certificate" />

            <TeacherCertificateInnerLayout
                teacherNames={teacherNames}
                certificates={certificates}
                idCardCertificates={idCardCertificates}
            />
        </DashboardLayout>
    );
}
