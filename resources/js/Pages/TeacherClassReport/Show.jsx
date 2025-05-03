import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherReportInnerLayout from './Partials/TeacherReportInnerLayout';

export default function Show({ auth, siteData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classroom</h2>}
        >
            <Head title="Classroom" />
            <TeacherReportInnerLayout siteData={siteData}  />
        </DashboardLayout>
    );
}