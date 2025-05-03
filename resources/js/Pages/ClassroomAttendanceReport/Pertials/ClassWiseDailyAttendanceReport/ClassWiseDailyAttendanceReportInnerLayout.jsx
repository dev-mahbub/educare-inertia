import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React, { useState } from 'react';
import ClassWiseDailyAttendenseFilter from './ClassWiseDailyAttendenseFilter';
import ClassWiseDailyAttendenseTableList from './ClassWiseDailyAttendenseTableList';

const ClassWiseDailyAttendanceReportInnerLayout = ({
    classWiseAttendance,
    totalStudentsSum,
    presentCountSum,
    absentCountSum,
    leaveCountSum,
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
                    <ClassWiseDailyAttendenseFilter
                        attendanceCount={Object?.values(classWiseAttendance).length}
                        setLoading={setLoading}
                    />
                    <ClassWiseDailyAttendenseTableList
                        classWiseAttendance={classWiseAttendance}
                        totalStudentsSum={totalStudentsSum}
                        presentCountSum={presentCountSum}
                        absentCountSum={absentCountSum}
                        leaveCountSum={leaveCountSum}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassWiseDailyAttendanceReportInnerLayout;
