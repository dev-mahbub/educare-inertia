import React from 'react';
import ClassTimeTableMenu from '@/Components/Partials/Menus/TimeTable/ClassTimeTableMenu';
import TeacherTimeTableMain from './TeacherTimeTableMain';

const TeacherTimeTableInnerLayout = ({shiftTypes, timetables}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <ClassTimeTableMenu />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherTimeTableMain shiftTypes={shiftTypes} timetables={timetables} />
                </div>
            </div>
        </div>
    );
};

export default TeacherTimeTableInnerLayout;