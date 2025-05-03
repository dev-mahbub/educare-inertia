import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PageListInnerLayout from './Partials/List/PageListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    lists,
    newsStatusArr,
    orderByTypes,
    audienceTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="News List" />
            <PageListInnerLayout
                lists={lists}
                newsStatusArr={newsStatusArr}
                orderByTypes={orderByTypes}
                audienceTypes={audienceTypes}
            />
        </DashboardLayout>
    );
}
