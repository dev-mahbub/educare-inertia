import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AssessmentInnerLayout from './Partials/List/AssessmentInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, classrooms, subjects, assessments, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assessment List</h2>}
        >
            <Head title="Assessment List" />

            <AssessmentInnerLayout assessments={assessments} classrooms={classrooms} subjects={subjects} />
        </DashboardLayout>
    );
}
