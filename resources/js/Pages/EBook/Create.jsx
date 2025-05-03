import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EbookCreateInnerLayout from './Partials/EbookCreate/EbookCreateInnerLayout';

export default function Create({
    auth,
    siteData,
    classNames,
    subjects,
    bookCategory,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">E-book add</h2>}
        >
            <Head title="E-book add" />

            <EbookCreateInnerLayout
                classNames={classNames}
                subjects={subjects}
                bookCategory={bookCategory}
            />
        </DashboardLayout>
    );
}
