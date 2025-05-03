import React from 'react';
import StaffWiseAttendanceReportFilter from './StaffWiseAttendanceReportFilter';
import StaffWiseAttendanceReportTable from './StaffWiseAttendanceReportTable';
import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';

const StaffWiseAttendanceReportInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LeaveHeaderMenus title="LEAVE MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <StaffWiseAttendanceReportFilter />
                        <StaffWiseAttendanceReportTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffWiseAttendanceReportInnerLayout;