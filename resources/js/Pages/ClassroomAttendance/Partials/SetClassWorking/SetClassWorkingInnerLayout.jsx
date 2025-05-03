import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import React from 'react';
import SetClassWorkingFilter from './SetClassWorkingFilter';
import SetClassWorkingTable from './SetClassWorkingTable';

const SetClassWorkingInnerLayout = ({
    classNames,
    academicSession,
    monthArr,
    academicYearId,
    monthId,
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
                        {/* <SetClassWorkingFilter /> */}
                        <SetClassWorkingTable
                            classNames={classNames}
                            academicSession={academicSession}
                            monthArr={monthArr}
                            academicYearId={academicYearId}
                            monthId={monthId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetClassWorkingInnerLayout;
