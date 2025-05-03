import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateClassroomGroupContactInnerLayout from './Partials/CreateClassroomGroupContactInnerLayout';

export default function Show({ auth, siteData, mustVerifyEmail, classroomGroups, status , message }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Classroom Groups</h2>}
        >
            <Head title="Classroom Groups" />

            <CreateClassroomGroupContactInnerLayout classroomGroups={classroomGroups}  />
        </DashboardLayout>
    );
}