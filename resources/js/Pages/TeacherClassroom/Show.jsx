import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherClassroomInnerLayout from './Partials/TeacherClassroomInnerLayout';

export default function Show({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classroom</h2>}
        >
            <Head title="Classroom" />
            <TeacherClassroomInnerLayout siteData={siteData}  />
        </DashboardLayout>
    );
}