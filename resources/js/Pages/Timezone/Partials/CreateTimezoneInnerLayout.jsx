import React from "react";
import TimezoneForm from "./TimezoneForm";
import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";

const CreateTimezoneInnerLayout = ({timezones, timezone_array}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Timezone" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TimezoneForm
                        timezones={timezones}
                        timezone_array= {timezone_array}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateTimezoneInnerLayout;