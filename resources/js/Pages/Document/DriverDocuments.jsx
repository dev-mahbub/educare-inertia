import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DriverDocumentsInnerLayout from './Partials/DriverDocuments/DriverDocumentsInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function DriverDocuments({
    auth,
    siteData,
    driverDocuments,
    drivers,
    documentCategories
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Driver Documents</h2>}
        >
            <Head title="Driver Documents" />

            <DriverDocumentsInnerLayout
                driverDocuments={driverDocuments}
                drivers={drivers}
                documentCategories={documentCategories}
            />
        </DashboardLayout>
    );
}
