import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React from 'react';
import SetSectionWorkingFilter from './SetSectionWorkingFilter';
import SetSectionWorkingTable from './SetSectionWorkingTable';

const SetSectionWorkingInnerLayout = ({
    workingClassroom,
    academicSession,
    monthArr,
    academicYearId,
    monthId,
    classId,
    classNames,
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
                        <SetSectionWorkingTable
                            workingClassroom={workingClassroom}
                            academicSession={academicSession}
                            monthArr={monthArr}
                            academicYearId={academicYearId}
                            monthId={monthId}
                            classId={classId}
                            classNames={classNames}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetSectionWorkingInnerLayout;
