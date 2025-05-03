import React from "react";
import HouseForm from "./HouseForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateHouseInnerLayout = ({houses}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="House" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <HouseForm
                        houses={houses}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateHouseInnerLayout;