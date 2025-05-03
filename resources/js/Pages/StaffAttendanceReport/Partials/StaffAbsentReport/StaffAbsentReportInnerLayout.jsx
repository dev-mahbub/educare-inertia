import React from 'react';
import StaffAbsentReportFilter from './StaffAbsentReportFilter';
import StaffAbsentReportTableList from './StaffAbsentReportTableList';
import StaffAttendanceHeaderMenus from '@/Components/Partials/Menus/StaffAttendance/StaffAttendanceHeaderMenus';

const StaffAbsentReportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StaffAttendanceHeaderMenus title="Staff Attendance" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffAbsentReportFilter />
                    <StaffAbsentReportTableList />
                </div>
            </div>
        </div>
    );
};

export default StaffAbsentReportInnerLayout;