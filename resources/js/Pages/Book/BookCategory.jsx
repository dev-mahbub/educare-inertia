import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BookCategoryInnerLayout from './Partials/BookCategory/BookCategoryInnerLayout';

export default function BookCategory({ auth, siteData, bookCategory }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Book Search By Location</h2>}
        >
            <Head title="Book Search By Location" />

            <BookCategoryInnerLayout
                bookCategory={bookCategory}
            />
        </DashboardLayout>
    );
}
