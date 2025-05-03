import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PreviewAcademicReportCardInnerLayout from './Partials/PreviewAcademicReportCard/PreviewAcademicReportCardInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PreviewReportCard({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    classrooms,
    students,
    student
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">preview Academic Report Card</h2>}
        >
            <Head title="Preview Academic Report Card" />

            <PreviewAcademicReportCardInnerLayout
                classrooms={classrooms}
                students={students}
                student={student}
            />
        </DashboardLayout>
    );
}
