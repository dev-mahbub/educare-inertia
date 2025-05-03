import React from "react";
import SchoolShiftForm from "./SchoolShiftForm";
import SchoolShiftMenu from "../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";

const SchoolShiftInnerLayout = ({ schoolShifts, shiftType }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <SchoolShiftMenu title="Time Table Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SchoolShiftForm
                        schoolShifts={schoolShifts}
                        shiftType={shiftType}
                    />
                </div>
            </div>
        </div>
    );
};

export default SchoolShiftInnerLayout;
