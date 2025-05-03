import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AccountSettingInnerLayout from './Partials/AccountMaster/AccountSetting/AccountSettingInnerLayout';

export default function CreateCompany({
    auth,
    siteData,
    siteSettings,
    siteSettingsReceipt,
    siteSettingsVoucher,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts Management</h2>}
        >
            <Head title="Inventory Management" />
            <AccountSettingInnerLayout
                siteSettings={siteSettings}
                siteSettingsReceipt={siteSettingsReceipt}
                siteSettingsVoucher={siteSettingsVoucher}
            />
        </DashboardLayout>
    );
}
