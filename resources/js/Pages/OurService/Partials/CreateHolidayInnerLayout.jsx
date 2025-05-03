import React from "react";
import HolidayForm from "./HolidayForm";
import HolidayMenuCategory from "./HolidayMenuCategory";

const CreateHolidayInnerLayout = ({holiday_types, holidays}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <HolidayMenuCategory title="Holidays" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <HolidayForm
                        holiday_types={holiday_types}
                        holidays={holidays}
                        className=""
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateHolidayInnerLayout;