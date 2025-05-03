import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DocumentDashboardInnerLayout from './Partials/DocumentDashboard/DocumentDashboardInnerLayout';

export default function DocumentDashboard({
    auth,
    siteData,
    teacherDocumentSummary,
    studentDocumentSummary,
    studentDocumentCategories,
    driverDocumentSummary,
    schoolDocumentSummary
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Document Dashboard</h2>}
        >
            <Head title="Document Dashboard" />

            <DocumentDashboardInnerLayout
                teacherDocumentSummary={teacherDocumentSummary}
                studentDocumentSummary={studentDocumentSummary}
                studentDocumentCategories={studentDocumentCategories}
                driverDocumentSummary={driverDocumentSummary}
                schoolDocumentSummary={schoolDocumentSummary}
            />
            {/* <AddDocumentCategoryInnerLayout/> */}
        </DashboardLayout>
    );
}
