import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherDetailsInnerLayout from './Partials/Details/TeacherDetailsInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Details</h2>}
        >
            <Head title="Teacher Details" />

            <TeacherDetailsInnerLayout />
        </DashboardLayout>
    );
}
