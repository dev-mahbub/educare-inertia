import React from "react";
import EmergencyContactForm from "./EmergencyContactForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateEmergencyContactInnerLayout = ({contacts}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Emergency Contacts" />

                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EmergencyContactForm
                        contacts={contacts}
                        className=""
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEmergencyContactInnerLayout;