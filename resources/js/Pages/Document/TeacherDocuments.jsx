import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import TeacherDocumentsInnerLayout from './Partials/TeacherDocuments/TeacherDocumentsInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function TeacherDocuments({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    teachers,
    teacherDocumentCategories,
    documents
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Documents</h2>}
        >
            <Head title="Teacher Documents" />

            <TeacherDocumentsInnerLayout
                teachers={teachers}
                teacherDocumentCategories={teacherDocumentCategories}
                documents={documents}
            />
        </DashboardLayout>
    );
}
