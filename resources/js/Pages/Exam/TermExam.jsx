import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddTermWiseReportCardInnerLayout from './Partials/Masters/AddTermWiseReportCard/AddTermWiseReportCardInnerLayout';

export default function TermExam({ auth, siteData, termExams, termWise }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Term Wise Exam</h2>}
        >
            <Head title="Term Wise Exam" />

            <AddTermWiseReportCardInnerLayout
                termExams={termExams}
                termWise={termWise}
            />
        </DashboardLayout>
    );
}
