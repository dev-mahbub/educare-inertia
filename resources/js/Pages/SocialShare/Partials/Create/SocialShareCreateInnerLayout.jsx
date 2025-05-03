import React from 'react';
import SmsSettingForm from '@/Pages/SmsSetting/Partials/SmsSettingForm';
import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";

const SocialShareCreateInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="Social Share" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SmsSettingForm />
                </div>
            </div>
        </div>
    );
};

export default SocialShareCreateInnerLayout;