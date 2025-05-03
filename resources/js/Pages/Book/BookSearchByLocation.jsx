import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BookSearchByLocationInnerLayout from './Partials/BookSearchByLocation/BookSearchByLocationInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function BookSearchByLocation({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Book Search By Location</h2>}
        >
            <Head title="Book Search By Location" />

            <BookSearchByLocationInnerLayout/>
        </DashboardLayout>
    );
}