import React from 'react';
import MonthWiseAttendanceReportFilter from './MonthWiseAttendanceReportFilter';
import MonthWiseAttendanceReportTableList from './MonthWiseAttendanceReportTableList';
import StaffAttendanceHeaderMenus from '@/Components/Partials/Menus/StaffAttendance/StaffAttendanceHeaderMenus';

const MonthWiseAttendanceReportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StaffAttendanceHeaderMenus title="Staff Attendance" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <MonthWiseAttendanceReportFilter />
                    <MonthWiseAttendanceReportTableList />
                </div>
            </div>
        </div>
    );
};

export default MonthWiseAttendanceReportInnerLayout;