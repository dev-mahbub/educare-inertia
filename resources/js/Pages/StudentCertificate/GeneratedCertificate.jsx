import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import GeneratedCertificateInnerLayout from './Partials/GeneratedCertificate/GeneratedCertificateInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function GeneratedCertificate({ auth, siteData, classroomStudents, certificateStudents }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generated Certificate</h2>}
        >
            <Head title="Generated Certificate" />

            <GeneratedCertificateInnerLayout
                classroomStudents={classroomStudents}
                certificateStudents={certificateStudents}
            />
        </DashboardLayout>
    );
}
