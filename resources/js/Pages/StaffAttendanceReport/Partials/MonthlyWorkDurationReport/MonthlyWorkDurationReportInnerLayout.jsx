import React from 'react';
import MonthlyWorkDurationReportFilter from './MonthlyWorkDurationReportFilter';
import MonthlyWorkDurationReportList from './MonthlyWorkDurationReportList';
import StaffAttendanceHeaderMenus from '@/Components/Partials/Menus/StaffAttendance/StaffAttendanceHeaderMenus';

const MonthlyWorkDurationReportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StaffAttendanceHeaderMenus title="Staff Attendance" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <MonthlyWorkDurationReportFilter />
                    <MonthlyWorkDurationReportList />
                </div>
            </div>
        </div>
    );
};

export default MonthlyWorkDurationReportInnerLayout;