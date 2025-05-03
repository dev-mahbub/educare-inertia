import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SocialShareConfigurationCreateInnerLayout from './Partials/Create/SocialShareConfigurationCreateInnerLayout';

export default function Create({
    auth,
    siteData,
    socialSettings,
    socialButtonSettings,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Sms Settings</h2>}
        >
            <Head title="Social Share Settings" />
            <SocialShareConfigurationCreateInnerLayout
                socialSettings={socialSettings}
                socialButtonSettings={socialButtonSettings}
            />
        </DashboardLayout>
    );
}
