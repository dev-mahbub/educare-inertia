import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import UploadDocumentsInnerlayout from './Partials/UploadDocuments/UploadDocumentsInnerlayout';

export default function Create({
    auth,
    siteData,
    userTypes,
    teachers,
    classrooms,
    students,
    statusArray,
    // studentDocumentCategories,
    // teacherDocumentCategories,
    documentCategories,
    drivers
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create</h2>}
        >
            <Head title="Create" />

            <UploadDocumentsInnerlayout
                userTypes={userTypes}
                teachers={teachers}
                classrooms={classrooms}
                students={students}
                statusArray={statusArray}
                // studentDocumentCategories={studentDocumentCategories}
                // teacherDocumentCategories={teacherDocumentCategories}
                documentCategories={documentCategories}
                drivers={drivers}
            />
        </DashboardLayout>
    );
}
