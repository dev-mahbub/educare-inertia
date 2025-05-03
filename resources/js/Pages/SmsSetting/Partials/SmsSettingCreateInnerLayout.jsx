import React from "react";
import SmsSettingCreateForm from "./SmsSettingCreateForm";
import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";

const SmsSettingCreateInnerLayout = ({
    smsSettings,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="Configuration Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SmsSettingCreateForm
                        smsSettings={smsSettings}
                    />
                </div>
            </div>
        </div>
    );
};

export default SmsSettingCreateInnerLayout;
