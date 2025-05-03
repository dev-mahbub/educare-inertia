import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherDownloadInnerLayout from './Partials/TeacherDownload/TeacherDownloadInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeacherDownload({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Download</h2>}
        >
            <Head title="Teacher Download" />

            <TeacherDownloadInnerLayout />
        </DashboardLayout>
    );
}
