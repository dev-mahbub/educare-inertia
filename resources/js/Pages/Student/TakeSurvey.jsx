import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TakeSurveyInnerLayout from './Partials/Survey/TakeSurveyInnerLayout';
export default function SurveyList({ auth, siteData, students, studentId, survey}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Survey</h2>}
        >
            <Head title="Student Survey" />

            <TakeSurveyInnerLayout
                students={students}
                studentId={studentId}
                survey={survey}
            />
        </DashboardLayout>
    );
}
