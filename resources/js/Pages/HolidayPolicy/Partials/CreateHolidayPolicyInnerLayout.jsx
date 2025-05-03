import React from "react";
import HolidayPolicyForm from "./HolidayPolicyForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateHolidayPolicyInnerLayout = ({holiday_policy_days, holiday_policy_days_rule, holiday_polices}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Holiday Policy" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <HolidayPolicyForm
                        holiday_policy_days={holiday_policy_days}
                        holiday_policy_days_rule={holiday_policy_days_rule}
                        holiday_polices={holiday_polices}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateHolidayPolicyInnerLayout;