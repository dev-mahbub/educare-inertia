import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassInnerLayout from './Partials/ClassInnerLayout';

export default function Edit({ auth, siteData, mustVerifyEmail, status, classrooms }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class list</h2>}
        >
            <Head title="Class time table List" />

            <ClassInnerLayout classrooms={classrooms} />
        </DashboardLayout>
    );
}
