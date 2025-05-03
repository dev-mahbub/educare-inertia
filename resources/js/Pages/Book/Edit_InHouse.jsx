import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditInHouseInnerLayout from './Partials/Edit_InHouse/EditInHouseInnerLayout';

export default function Edit_InHouse({
    auth,
    siteData,
    bookTypes,
    libraryVendor,
    bookCategory,
    classNames,
    subjects,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Inhouse</h2>}
        >
            <Head title="Edit Inhouse" />
            <EditInHouseInnerLayout
                bookTypes={bookTypes}
                libraryVendor={libraryVendor}
                bookCategory={bookCategory}
                classNames={classNames}
                subjects={subjects}
            />
        </DashboardLayout>
    );
}
