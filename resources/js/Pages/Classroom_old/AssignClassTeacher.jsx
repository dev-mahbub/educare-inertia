import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssignTeacherInnerLayout from './Partials/AssignTeacherInnerLayout';

export default function Create({ auth, siteData, classrooms, teachers, selectedTeachers }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create School" />

            <AssignTeacherInnerLayout classrooms = {classrooms} teachers={teachers} selectedTeachers={selectedTeachers}  />
        </DashboardLayout>
    );
}
