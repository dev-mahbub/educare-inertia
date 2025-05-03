import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import InactiveBooksInnerLayout from './Partials/InactiveBooks/InactiveBooksInnerLayout';

export default function InactiveBooks({ auth, siteData, inactiveBookList }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inactive Books</h2>}
        >
            <Head title="Inactive Books" />

            <InactiveBooksInnerLayout
                inactiveBookList={inactiveBookList}
            />
        </DashboardLayout>
    );
}
