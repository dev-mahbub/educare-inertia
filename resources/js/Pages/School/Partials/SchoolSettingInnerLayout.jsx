import React from "react";
import SchoolSettingForm from "./SchoolSettingForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const SchoolSettingInnerLayout = ({
    school,
    timezones,
    countries,
    states,
    boards,
    durations,
    academicYears,
    image,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="School Setting" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SchoolSettingForm
                        school={school}
                        timezones={timezones}
                        countries={countries}
                        states={states}
                        boards={boards}
                        durations={durations}
                        academicYears={academicYears}
                        imageData={image}
                    />
                </div>
            </div>
        </div>
    );
};

export default SchoolSettingInnerLayout;
