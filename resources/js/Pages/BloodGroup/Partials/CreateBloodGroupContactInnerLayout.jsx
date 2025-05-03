import React from "react";
import BloodGroupForm from "./BloodGroupForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateBloodGroupInnerLayout = ({blood_groups}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Blood Groups" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <BloodGroupForm
                        blood_groups={blood_groups}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateBloodGroupInnerLayout;