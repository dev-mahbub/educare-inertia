import React from "react";
import DateWiseClassAttendanceReportFilter from "./DateWiseClassAttendanceReportFilter";
import DateWiseClassAttendanceTableList from "./DateWiseClassAttendanceTableList";
import DateWiseClassAttendanceTopFilter from "./DateWiseClassAttendanceTopFilter";
import StaffAttendanceHeaderMenus from "@/Components/Partials/Menus/StaffAttendance/StaffAttendanceHeaderMenus";

const DateWiseClassAttendanceReportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StaffAttendanceHeaderMenus title="Staff Attendance" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DateWiseClassAttendanceTopFilter />
                    <DateWiseClassAttendanceReportFilter />
                    <DateWiseClassAttendanceTableList />
                </div>
            </div>
        </div>
    );
};

export default DateWiseClassAttendanceReportInnerLayout;
