import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CertificateListInnerLayout from './Partials/CertificateList/CertificateListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function CertificateList({ auth, siteData, studentCertificate }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Certificate List</h2>}
        >
            <Head title="Certificate List" />

            <CertificateListInnerLayout
                studentCertificate={studentCertificate}
            />
        </DashboardLayout>
    );
}
