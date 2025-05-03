import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditSmsSettingTemplateInnerLayout from './Partials/Template/Edit/EditSmsSettingTemplateInnerLayout';

export default function EditTemplate({ auth, siteData, templates, template, smsAudiences, smsAudienceTeachers, smsAudienceContexts, smsAudienceTags }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit DLT Templates</h2>}
        >
            <Head title="Edit DLT Templates" />
            <EditSmsSettingTemplateInnerLayout
                templates={templates}
                template={template}
                smsAudiences={smsAudiences}
                smsAudienceTeachers={smsAudienceTeachers}
                smsAudienceContexts={smsAudienceContexts}
                smsAudienceTags={smsAudienceTags}
            />
        </DashboardLayout>
    );
}
