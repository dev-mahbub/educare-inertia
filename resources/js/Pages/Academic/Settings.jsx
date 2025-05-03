import { Head } from "@inertiajs/react";
import DashboardLayout from '@/Layouts/DashboardLayout';
import AcademicSettingInnerLayout from "./Partials/AcademicSetting/AcademicSettingInnerLayout";

export default function settings({
    auth,
    siteData,
    siteSettingsReportCard,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Academic Settings
                </h2>
            }
        >
            <Head title="Academic Settings" />

            <AcademicSettingInnerLayout
                siteSettingsReportCard={siteSettingsReportCard}
            />
        </DashboardLayout>
    );
}
