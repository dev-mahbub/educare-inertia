import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentCertificateInnerLayout from './Partials/StudentCertificate/StudentCertificateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function StudentCertificate({
    auth,
    siteData,
    classrooms,
    studentNames,
    students,
    academicSession,
    feeTypes,
    feeTitles,
    classroomWthExam,
    certificates,
    idCardCertificates
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Certificate</h2>}
        >
            <Head title="Student Certificate" />

            <StudentCertificateInnerLayout
                classrooms={classrooms}
                studentNames={studentNames}
                students={students}
                academicSession={academicSession}
                feeTypes={feeTypes}
                feeTitles={feeTitles}
                classroomWthExam={classroomWthExam}
                certificates={certificates}
                idCardCertificates={idCardCertificates}
            />
        </DashboardLayout>
    );
}
