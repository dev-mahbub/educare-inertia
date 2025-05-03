import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FinalConsolidatedReportInnerLayout from './Partials/FinalConsolidatedReport/FinalConsolidatedReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function FinalConsolidated({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    examsData,
    examSubjects
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Final Consolidated Report</h2>}
        >
            <Head title="Final Consolidated Report" />

            <FinalConsolidatedReportInnerLayout
            classrooms = {classrooms}
            examsData = {examsData}
            examSubjects = {examSubjects}
            />
        </DashboardLayout>
    );
}
