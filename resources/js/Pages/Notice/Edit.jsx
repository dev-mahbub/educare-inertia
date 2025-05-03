import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NoticeFromInnerLayout from './Partials/Edit/NoticeFromInnerLayout';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    statusArr,
    noticeTypes,
    audienceTypes,
    classrooms,
    notice
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit Notice" />
            <NoticeFromInnerLayout
                statusArr={statusArr}
                noticeTypes={noticeTypes}
                audienceTypes={audienceTypes}
                classrooms={classrooms}
                notice={notice}
            />
        </DashboardLayout>
    );
}
