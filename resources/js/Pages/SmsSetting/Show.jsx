import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SmsSettingInnerLayout from './Partials/SmsSettingInnerLayout';

export default function Show({ auth, siteData, smsTypeArr, smsSettings, classNames }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Approved DLT Templates</h2>}
        >
            <Head title="Approved DLT Templates" />
            <SmsSettingInnerLayout
                smsTypeArr={smsTypeArr}
                smsSettings={smsSettings}
                classNames={classNames}
            />
        </DashboardLayout>
    );
}
