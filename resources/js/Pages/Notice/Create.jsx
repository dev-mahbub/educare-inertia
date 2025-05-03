import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NoticeFromInnerLayout from './Partials/Create/NoticeFromInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    statusArr,
    noticeTypes,
    audienceTypes,
    classrooms
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create Notice" />
            <NoticeFromInnerLayout
                statusArr={statusArr}
                noticeTypes={noticeTypes}
                audienceTypes={audienceTypes}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}
