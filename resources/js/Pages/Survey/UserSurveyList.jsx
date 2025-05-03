import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UserSurveyListInnerLayout from './Partials/UserSurveyList/UserSurveyListInnerLayout';

export default function UserSurveyList({ auth, siteData, mustVerifyEmail, status, surveys }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Survey List" />
            <UserSurveyListInnerLayout
                surveys={surveys}
            />
        </DashboardLayout>
    );
}
