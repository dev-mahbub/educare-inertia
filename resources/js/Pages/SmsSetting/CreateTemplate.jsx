import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateSmsSettingTemplateInnerLayout from './Partials/Template/Create/CreateSmsSettingTemplateInnerLayout';

export default function CreateTemplate({ auth, siteData, templates, smsAudiences, smsAudienceTeachers, smsAudienceContexts, smsAudienceTags }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Approved DLT Templates</h2>}
        >
            <Head title="Approved DLT Templates" />
            <CreateSmsSettingTemplateInnerLayout
                templates={templates}
                smsAudiences={smsAudiences}
                smsAudienceTeachers={smsAudienceTeachers}
                smsAudienceContexts={smsAudienceContexts}
                smsAudienceTags={smsAudienceTags}
            />
        </DashboardLayout>
    );
}
