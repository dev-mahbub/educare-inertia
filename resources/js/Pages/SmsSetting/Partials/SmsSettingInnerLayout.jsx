import React from 'react';
import SmsSettingForm from './SmsSettingForm';
import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";

const SmsSettingInnerLayout = ({ smsTypeArr, smsSettings, classNames }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="Approved DLT Templates" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SmsSettingForm
                        smsTypeArr={smsTypeArr}
                        smsSettings={smsSettings}
                        classNames={classNames}
                    />
                </div>
            </div>
        </div>
    );
};

export default SmsSettingInnerLayout;
