import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PageFromInnerLayout from './Partials/Create/PageFromInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    statusArr,
    pageTypes,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create News" />
            <PageFromInnerLayout
                statusArr={statusArr}
                pageTypes={pageTypes}
            />
        </DashboardLayout>
    );
}
