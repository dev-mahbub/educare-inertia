import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NewsListInnerLayout from './Partials/List/NewsListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    newsLists,
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
            <NewsListInnerLayout
                newsLists={newsLists}
                newsStatusArr={newsStatusArr}
                orderByTypes={orderByTypes}
                audienceTypes={audienceTypes}
            />
        </DashboardLayout>
    );
}
