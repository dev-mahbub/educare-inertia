import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ReturnBookInnerLayout from './Partials/ReturnBook/ReturnBookInnerLayout';

export default function ReturnBook({ auth, siteData, bookData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Return Book</h2>}
        >
            <Head title="Return Book" />

            <ReturnBookInnerLayout
                bookData={bookData}
            />
        </DashboardLayout>
    );
}
