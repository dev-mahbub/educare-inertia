import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateAssessmentInnerLayout from './Partials/Create/CreateAssessmentInnerLayout';

export default function Create({ auth, siteData, mustVerifyEmail, subjects, classNames, classRoom, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Assessment</h2>}
        >
            <Head title="Create Assessment" />

            <CreateAssessmentInnerLayout
                subjects={subjects}
                classNames={classNames}
                classRoom={classRoom}
            />
        </DashboardLayout>
    );
}
