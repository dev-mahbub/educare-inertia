import React from 'react';
import ExtraDayReportFilter from './ExtraDayReportFilter';
import ExtraDayReportTableList from './ExtraDayReportTableList';
import StaffAttendanceHeaderMenus from '@/Components/Partials/Menus/StaffAttendance/StaffAttendanceHeaderMenus';

const ExtraDayReportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StaffAttendanceHeaderMenus title="Staff Attendance" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExtraDayReportFilter />
                    <ExtraDayReportTableList />
                </div>
            </div>
        </div>
    );
};

export default ExtraDayReportInnerLayout;