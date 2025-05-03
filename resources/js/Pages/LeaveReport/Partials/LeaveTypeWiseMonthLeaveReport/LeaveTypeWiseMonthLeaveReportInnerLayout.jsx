import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import React from 'react';
import LeaveTypeWiseMonthLeaveReportFilter from './LeaveTypeWiseMonthLeaveReportFilter';
import LeaveTypeWiseMonthLeaveReportTable from './LeaveTypeWiseMonthLeaveReportTable';

const LeaveTypeWiseMonthLeaveReportInnerLayout = () => {
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
                        <LeaveTypeWiseMonthLeaveReportFilter />
                        <LeaveTypeWiseMonthLeaveReportTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveTypeWiseMonthLeaveReportInnerLayout;