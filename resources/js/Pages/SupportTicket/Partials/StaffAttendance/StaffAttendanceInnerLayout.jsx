import React from 'react';
import StaffAttendanceForm from './StaffAttendanceForm';

const StaffAttendanceInnerLayout = ({currentSchoolInfo, messageData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap min-h-[calc(100vh-150px)]">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffAttendanceForm currentSchoolInfo={currentSchoolInfo} messageData={messageData} />
                </div>
            </div>
        </div>
    );
};

export default StaffAttendanceInnerLayout;