import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EbookListInnerLayout from './Partials/EbookList/EbookListInnerLayout';

export default function EBookList({ auth, siteData, ebookList }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">e-book list</h2>}
        >
            <Head title="E-book list" />

            <EbookListInnerLayout
                ebookList={ebookList}
            />
        </DashboardLayout>
    );
}
