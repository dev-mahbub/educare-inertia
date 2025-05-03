import React from 'react';
import StudentAttendanceList from './StudentAttendanceList';
import StudentAttendanceFilter from './StudentAttendanceFilter';

const AttendanceListInnerLayout = ({students, studentId, monthlyReport}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <SearchBar  /> */}
                    <StudentAttendanceFilter students={students} studentId={studentId} monthlyReport={monthlyReport} />
                    <StudentAttendanceList students={students} studentId={studentId} monthlyReport={monthlyReport} />
                </div>
            </div>
        </div>
    );
};

export default AttendanceListInnerLayout;
