import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ActivityInnerLayout from './Partials/Activity/ActivityInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, assessment, students, assessmentTypes, comments, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assessment List</h2>}
        >
            <Head title="Assessment List" />

            <ActivityInnerLayout 
                assessment={assessment}
                students={students}
                assessmentTypes={assessmentTypes}
                comments={comments}
            />
        </DashboardLayout>
    );
}
