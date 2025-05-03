import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import StudentDownloadInnerLayout from './Partials/StudentDownload/StudentDownloadInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Student({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student</h2>}
        >
            <Head title="Student" />

            <StudentDownloadInnerLayout />
        </DashboardLayout>
    );
}
