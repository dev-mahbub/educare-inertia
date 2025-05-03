import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PageFromInnerLayout from './Partials/Edit/PageFromInnerLayout';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    statusArr,
    pageTypes,
    page
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit News" />
            <PageFromInnerLayout
                statusArr={statusArr}
                pageTypes={pageTypes}
                page={page}
            />
        </DashboardLayout>
    );
}
