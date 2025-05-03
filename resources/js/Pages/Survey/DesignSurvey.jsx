import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DesignSurveyList from './Partials/DesignSurveyList';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    questionTypes,
    survey
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create Online Class" />
            <DesignSurveyList
                questionTypes={questionTypes}
                survey={survey}
            />
        </DashboardLayout>
    );
}
