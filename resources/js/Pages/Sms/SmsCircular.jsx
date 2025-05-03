import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SmsCircularInnerLayout from './Partials/SmsCircular/SmsCircularInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    templateCategories,
    templates,
    audienceTypes,
    audienceAttributes,
    smsCirculars
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Sms" />

            <SmsCircularInnerLayout
                templateCategories={templateCategories}
                templates={templates}
                audienceTypes={audienceTypes}
                audienceAttributes={audienceAttributes}
                smsCirculars={smsCirculars}
            />
        </DashboardLayout>
    );
}
