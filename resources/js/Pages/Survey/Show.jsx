import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SurveyFeedbackLayout from '@/Pages/Survey/Partials/SurveyFeedbackLayout';

export default function Create({ auth, siteData, mustVerifyEmail, classrooms, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Feedback</h2>}
        >
            <Head title="Feedback" />
            
            <SurveyFeedbackLayout classrooms={classrooms}  />
        </DashboardLayout>
    );
}