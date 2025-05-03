import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SmsSettingCreateInnerLayout from './Partials/SmsSettingCreateInnerLayout';

export default function Setting({
    auth,
    siteData,
    smsSettings,
  }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Email Setting</h2>}
        >
            <Head title="SMS Setting" />
            <SmsSettingCreateInnerLayout
                smsSettings={smsSettings}
            />
        </DashboardLayout>
    );
}
