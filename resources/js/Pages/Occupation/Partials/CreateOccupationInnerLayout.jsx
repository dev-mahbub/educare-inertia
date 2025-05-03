import React from "react";
import OccupationForm from "./OccupationForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateOccupationInnerLayout = ({occupations}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Occupations" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <OccupationForm
                        occupations={occupations}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateOccupationInnerLayout;