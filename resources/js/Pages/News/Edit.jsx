import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import NewsFromInnerLayout from './Partials/Edit/NewsFromInnerLayout';

export default function Edit({
    auth,
    siteData,
    mustVerifyEmail,
    statusArr,
    newsTypes,
    audienceTypes,
    classrooms,
    news
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit News" />
            <NewsFromInnerLayout
                statusArr={statusArr}
                newsTypes={newsTypes}
                audienceTypes={audienceTypes}
                classrooms={classrooms}
                news={news}
            />
        </DashboardLayout>
    );
}
