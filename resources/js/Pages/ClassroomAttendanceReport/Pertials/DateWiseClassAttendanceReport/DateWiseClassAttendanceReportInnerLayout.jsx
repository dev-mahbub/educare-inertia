import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React, { useState } from 'react';
import DateWiseClassAttendanceReportFilter from './DateWiseClassAttendanceReportFilter';
import DateWiseClassAttendanceTableList from './DateWiseClassAttendanceTableList';

const DateWiseClassAttendanceReportInnerLayout = ({
    classrooms,
    attendanceDetails,
}) => {

    const [loading, setLoading] = useState(false);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentAttendanceHeaderMenus title="STUDENT ATTENDANCE" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DateWiseClassAttendanceReportFilter
                        studentCount={attendanceDetails?.length}
                        classrooms={classrooms}
                        setLoading={setLoading}
                    />
                    <DateWiseClassAttendanceTableList
                        attendanceDetails={attendanceDetails}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateWiseClassAttendanceReportInnerLayout;
