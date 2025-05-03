import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CertificateMainInnerLayout from './Partials/CertificateMain/CertificateMainInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Show({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Main</h2>}
        >
            <Head title="Main" />

            <CertificateMainInnerLayout siteData={siteData} />
        </DashboardLayout>
    );
}
