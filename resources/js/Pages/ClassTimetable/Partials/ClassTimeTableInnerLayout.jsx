import React from 'react';
import ClassTimeTableMenu from '@/Components/Partials/Menus/TimeTable/ClassTimeTableMenu';
import ClassTimeTableMain from './ClassTimeTableMain';

const ClassTimeTableInnerLayout = ({shiftTypes, classrooms, timetables}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ClassTimeTableMenu />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ClassTimeTableMain shiftTypes={shiftTypes} classrooms={classrooms} timetables={timetables} />
                </div>
            </div>
        </div>
    );
};

export default ClassTimeTableInnerLayout;