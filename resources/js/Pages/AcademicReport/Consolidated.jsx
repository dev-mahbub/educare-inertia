import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ConsolidatedReportInnerLayout from './Partials/ConsolidatedReport/ConsolidatedReportInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Consolidated({ auth, siteData, mustVerifyEmail, status, schools, classrooms, getStudentListWithMark, examsData,examSubjects }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Consolidated Report</h2>}
        >
            <Head title="Consolidated Report" />

            <ConsolidatedReportInnerLayout 
            classrooms = {classrooms}
            getStudentListWithMark = {getStudentListWithMark}
            examsData = {examsData}
            examSubjects = {examSubjects}
            />
        </DashboardLayout>
    );
}
