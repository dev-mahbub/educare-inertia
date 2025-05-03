import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ActivityInnerLayout from './Partials/Activity/ActivityInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, assessment, students, classworkTypes, comments, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Homework List</h2>}
        >
            <Head title="Homework List" />

            <ActivityInnerLayout 
                assessment={assessment}
                students={students}
                classworkTypes={classworkTypes}
                comments={comments}
            />
        </DashboardLayout>
    );
}
