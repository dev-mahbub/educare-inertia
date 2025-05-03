import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateAssessmentInnerLayout from './Partials/Create/CreateAssessmentInnerLayout';
import EditAssessmentForm from './Partials/Edit/EditAssessmentForm';

export default function Create({ auth, siteData, mustVerifyEmail, assessment, subjects, classNames, classRoom, states, status }) {
    console.log(assessment);
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Assessment</h2>}
        >
            <Head title="Edit Assessment" />

            <EditAssessmentForm
                assessment={assessment}
                subjects={subjects}
                classNames={classNames}
                classRoom={classRoom}
            />
        </DashboardLayout>
    );
}
