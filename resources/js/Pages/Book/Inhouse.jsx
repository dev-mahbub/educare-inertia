import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import InhouseInnerLayout from './Partials/Inhouse/InhouseInnerLayout';

export default function Inhouse({
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inhouse</h2>}
        >
            <Head title="Inhouse" />
            <InhouseInnerLayout
                bookTypes={bookTypes}
                libraryVendor={libraryVendor}
                bookCategory={bookCategory}
                classNames={classNames}
                subjects={subjects}
            />
        </DashboardLayout>
    );
}
