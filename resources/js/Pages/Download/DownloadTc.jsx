import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DownloadTcInnerLayout from './Partials/DownloadTc/DownloadTcInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DownloadTc({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Download Tc</h2>}
        >
            <Head title="Download Tc" />

            <DownloadTcInnerLayout />
        </DashboardLayout>
    );
}
