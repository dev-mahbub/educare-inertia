import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SettingInnerLayout from './Partials/Setting/SettingInnerLayout';

export default function Setting({ auth, siteData, librarySiteSettings }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Setting</h2>}
        >
            <Head title="Setting" />

            <SettingInnerLayout
                librarySiteSettings={librarySiteSettings}
            />
        </DashboardLayout>
    );
}
