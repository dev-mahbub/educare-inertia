import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SurveyInnerLayout from './Partials/SurveyInnerLayout';

export default function Create({ auth, siteData, surveyAudience, classNamesData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create Online Class" />
            <SurveyInnerLayout
                surveyAudience={surveyAudience}
                classNamesData={classNamesData}
            />
        </DashboardLayout>
    );
}
