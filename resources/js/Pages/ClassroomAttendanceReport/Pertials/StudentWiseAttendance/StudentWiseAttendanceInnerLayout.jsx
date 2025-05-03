import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React, { useState } from 'react';
import StudentWiseAttendanceFilter from './StudentWiseAttendanceFilter';
import StudentWiseAttendanceTable from './StudentWiseAttendanceTable';

const StudentWiseAttendanceInnerLayout = ({
    classrooms,
    students,
    attendanceByMonth,
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
                    <StudentWiseAttendanceFilter
                        classrooms={classrooms}
                        students={students}
                        setLoading={setLoading}
                        attendanceCount={Object.keys(attendanceByMonth)?.length}
                    />
                    <StudentWiseAttendanceTable
                        attendanceByMonth={attendanceByMonth}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentWiseAttendanceInnerLayout;
