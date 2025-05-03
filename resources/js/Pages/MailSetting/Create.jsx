import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import MailSettingCreateInnerLayout from './Partials/MailSettingCreateInnerLayout';

export default function Create({
    auth,
    siteData,
    mailSettings,
    classrooms,
    staffData,
    mailEngineTypes,
    mailEncryptionTypes,
    mailAuthEnableTypes
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Email Setting</h2>}
        >
            <Head title="Mail Setting" />
            <MailSettingCreateInnerLayout
                mailSettings={mailSettings}
                classrooms={classrooms}
                staffData={staffData}
                mailEngineTypes={mailEngineTypes}
                mailEncryptionTypes={mailEncryptionTypes}
                mailAuthEnableTypes={mailAuthEnableTypes}
            />
        </DashboardLayout>
    );
}
