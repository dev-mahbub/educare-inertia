import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditTermWiseReportCardInnerLayout from './Partials/Masters/AddTermWiseReportCard/EditTermWiseReportCardInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TermExam({ auth, siteData, termExams='',termExam='' }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Term Wise Exam</h2>}
        >
            <Head title="Term Wise Exam" />

            <EditTermWiseReportCardInnerLayout 
                termExams = {termExams}
                termExam = {termExam}
            />
        </DashboardLayout>
    );
}
