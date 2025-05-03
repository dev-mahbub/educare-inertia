import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NoticeListInnerLayout from './Partials/List/NoticeListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    noticeLists,
    noticeStatusArr,
    orderByTypes,
    audienceTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Notice List" />
            <NoticeListInnerLayout
                noticeLists={noticeLists}
                noticeStatusArr={noticeStatusArr}
                orderByTypes={orderByTypes}
                audienceTypes={audienceTypes}
            />
        </DashboardLayout>
    );
}
