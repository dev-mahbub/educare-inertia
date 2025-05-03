import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import SettingsInnerLayout from './Partials/Setting/SettingsInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, status, states, siteSettingsRegistration, siteSettingsAccount, siteSettingsPayment, siteSettingsAdmission }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Settings</h2>}
        >
            <Head title="Registration Settings" />

            <SettingsInnerLayout
                siteSettingsRegistration={siteSettingsRegistration}
                siteSettingsAccount={siteSettingsAccount}
                siteSettingsPayment={siteSettingsPayment}
                siteSettingsAdmission={siteSettingsAdmission}
            />

        </DashboardLayout>
    );
}
