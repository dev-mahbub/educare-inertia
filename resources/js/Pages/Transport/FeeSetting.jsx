import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeSettingInnerLayout from './Partials/FeeSetting/FeeSettingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Setting({ auth, siteData, companies, transportSettingsData }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Setting</h2>}
        >
            <Head title="Fee Setting" />

            <FeeSettingInnerLayout 
                companies={companies}
                transportSettingsData={transportSettingsData} />
        </DashboardLayout>
    );
}
