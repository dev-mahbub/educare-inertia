import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SurveyInnerLayout from './Partials/Survey/SurveyInnerLayout';
export default function SurveyList({ auth, siteData, students, studentId, surveyList}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Survey List</h2>}
        >
            <Head title="Student Survey List" />

            <SurveyInnerLayout
                students={students}
                studentId={studentId}
                surveyList={surveyList}
            />
        </DashboardLayout>
    );
}
