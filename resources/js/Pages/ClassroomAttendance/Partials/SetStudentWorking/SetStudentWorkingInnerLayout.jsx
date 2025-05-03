import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React from 'react';
import SetStudentWorkingFilter from './SetStudentWorkingFilter';
import SetStudentWorkingTable from './SetStudentWorkingTable';

const SetStudentWorkingInnerLayout = ({
    studentDetails,
    academicSession,
    monthArr,
    classNames,
    classrooms,
    academicYearId,
    monthId,
    classId,
    classroomId,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentAttendanceHeaderMenus title="STUDENT ATTENDANCE" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <SetStudentWorkingTable
                            studentDetails={studentDetails}
                            academicSession={academicSession}
                            monthArr={monthArr}
                            classNames={classNames}
                            classrooms={classrooms}
                            academicYearId={academicYearId}
                            monthId={monthId}
                            classId={classId}
                            classroomId={classroomId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetStudentWorkingInnerLayout;
