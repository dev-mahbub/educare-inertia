import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SurveyInnerLayout from './Partials/SurveyList/SurveyInnerLayout';

export default function SurveyList({ auth, siteData, mustVerifyEmail, classrooms, status, surveys }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Survey List" />
            <SurveyInnerLayout
                surveys={surveys}
            />
        </DashboardLayout>
    );
}
