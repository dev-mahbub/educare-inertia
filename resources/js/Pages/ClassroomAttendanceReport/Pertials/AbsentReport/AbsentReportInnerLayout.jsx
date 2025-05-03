import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React, { useState } from 'react';
import AbsentReportFilter from './AbsentReportFilter';
import AbsentReportTableList from './AbsentReportTableList';

const AbsentReportInnerLayout = ({
    absentStudents,
    classNames,
    classrooms,
    boardingTypeArr,
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
                    <AbsentReportFilter
                        setLoading={setLoading}
                        classNames={classNames}
                        classrooms={classrooms}
                        boardingTypeArr={boardingTypeArr}
                        absentStudentsCount={absentStudents?.length}
                    />
                    <AbsentReportTableList
                        absentStudents={absentStudents}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default AbsentReportInnerLayout;
