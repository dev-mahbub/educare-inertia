import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherListInnerLayout from './Partials/List/TeacherListInnerLayout';

export default function Edit({ auth, siteData, teachers }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher List</h2>}
        >
            <Head title="Teacher List" />

            <TeacherListInnerLayout teachers={teachers} />
        </DashboardLayout>
    );
}
