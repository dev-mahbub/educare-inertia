import React from "react";
import ReligionForm from "./ReligionForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateReligionInnerLayout = ({religions}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Religion" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ReligionForm
                        religions={religions}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateReligionInnerLayout;