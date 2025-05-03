import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import SchoolDocumentsInnerLayout from "./Partials/SchoolDocuments/SchoolDocumentsInnerLayout";

export default function SchoolDocuments({
    auth,
    siteData,
    schoolDocuments,
    documentCategories
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    School Documents
                </h2>
            }
        >
            <Head title="School Documents" />

            <SchoolDocumentsInnerLayout
                schoolDocuments={schoolDocuments}
                documentCategories={documentCategories}
            />
        </DashboardLayout>
    );
}
