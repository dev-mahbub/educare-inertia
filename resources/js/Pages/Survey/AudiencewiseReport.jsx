import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AudiencewiseReportLayout from './Partials/AudiencewiseReportLayout';

export default function Create({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    surveys,
    audienceTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create Online Class" />
            <AudiencewiseReportLayout
                surveys={surveys}
                audienceTypes={audienceTypes}
            />
        </DashboardLayout>
    );
}
