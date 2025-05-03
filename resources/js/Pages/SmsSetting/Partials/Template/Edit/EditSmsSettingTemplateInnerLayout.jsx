import React from 'react';
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';
import EditSmsSettingTemplateForm from './EditSmsSettingTemplateForm';

const EditSmsSettingTemplateInnerLayout = ({ templates,template, smsAudiences, smsAudienceTeachers, smsAudienceContexts, smsAudienceTags }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="Approved DLT Templates" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditSmsSettingTemplateForm
                        templates={templates}
                        template={template}
                        smsAudiences={smsAudiences}
                        smsAudienceTeachers={smsAudienceTeachers}
                        smsAudienceContexts={smsAudienceContexts}
                        smsAudienceTags={smsAudienceTags}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditSmsSettingTemplateInnerLayout;
