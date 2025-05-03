import React from 'react';
import CreateSmsSettingTemplateForm from './CreateSmsSettingTemplateForm';
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateSmsSettingTemplateInnerLayout = ({ templates, smsAudiences, smsAudienceTeachers, smsAudienceContexts, smsAudienceTags }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="Approved DLT Templates" />

                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateSmsSettingTemplateForm
                        templates={templates}
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

export default CreateSmsSettingTemplateInnerLayout;
