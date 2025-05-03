import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignSyncSubjectInnerLayout from './Partials/AcademicActions/Assign/AssignSyncSubjectInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, subjects, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subjects</h2>}
        >
            <Head title="Subjects" />
            <AssignSyncSubjectInnerLayout />
        </DashboardLayout>
    );
}