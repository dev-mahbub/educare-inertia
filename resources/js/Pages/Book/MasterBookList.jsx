import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MasterBookListInnerLayout from './Partials/MasterBookList/MasterBookListInnerLayout';

export default function MasterBookList({
    auth,
    siteData,
    bookListData,
    bookCategory,
    classNames,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Master Book List</h2>}
        >
            <Head title="Master Book List" />

            <MasterBookListInnerLayout
                bookListData={bookListData}
                bookCategory={bookCategory}
                classNames={classNames}
            />
        </DashboardLayout>
    );
}
