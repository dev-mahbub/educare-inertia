import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherAcademicdInnerLayout from './Partials/TeacherAcademicdInnerLayout';

export default function Show({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Students</h2>}
        >
            <Head title="Manage Students" />
            <TeacherAcademicdInnerLayout siteData={siteData}  />
        </DashboardLayout>
    );
}