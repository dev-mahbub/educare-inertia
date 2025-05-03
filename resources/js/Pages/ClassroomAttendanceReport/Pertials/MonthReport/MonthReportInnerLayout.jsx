import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React, { useState } from 'react';
import MonthReportFilter from './MonthReportFilter';
import MonthReportTableList from './MonthReportTableList';

const MonthReportInnerLayout = ({
    students,
    classrooms,
    academicSession,
    monthArr,
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
                    <MonthReportFilter
                        studentCount={Object?.values(students).length}
                        setLoading={setLoading}
                        classrooms={classrooms}
                        academicSession={academicSession}
                        monthArr={monthArr}
                    />
                    <MonthReportTableList
                        students={students}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default MonthReportInnerLayout;
