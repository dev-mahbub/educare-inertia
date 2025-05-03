import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DocumentCateogryInnerLayout from './Partials/DocumentCateogry/DocumentCateogryInnerLayout';

export default function DocumentCateogry({
    auth,
    siteData,
    audienceTypes,
    documentCategories
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Driver Documents</h2>}
        >
            <Head title="Driver Documents" />

            <DocumentCateogryInnerLayout
                audienceTypes={audienceTypes}
                documentCategories={documentCategories}
            />
        </DashboardLayout>
    );
}
