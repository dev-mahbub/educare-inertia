import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import FeeSettingInnerLayout from './Partials/Master/FeeSetting/FeeSettingInnerLayout';

export default function FeeSetting({
    auth,
    siteData,
    mustVerifyEmail,
    classrooms,
    status,
    siteSettingsFee,
    siteSettingsAccount,
    templateTags,
    lateFineTypes,
    currentAcademicYear,
    backDateStaffIds,
    staffs,
    paymentGatewaySettings
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fee Settings</h2>}
        >
            <Head title="Fee Settings" />

            <FeeSettingInnerLayout
                siteSettingsFee={siteSettingsFee}
                siteSettingsAccount={siteSettingsAccount}
                templateTags={templateTags}
                lateFineTypes={lateFineTypes}
                currentAcademicYear={currentAcademicYear}
                backDateStaffIds={backDateStaffIds}
                staffs={staffs}
                paymentGatewaySettings={paymentGatewaySettings}
            />
        </DashboardLayout>
    );
}
