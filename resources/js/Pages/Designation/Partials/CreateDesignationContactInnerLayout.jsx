import React from "react";
import DesignationForm from "./DesignationForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateDesignationInnerLayout = ({designations}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Designation" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <DesignationForm
                        designations={designations}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateDesignationInnerLayout;