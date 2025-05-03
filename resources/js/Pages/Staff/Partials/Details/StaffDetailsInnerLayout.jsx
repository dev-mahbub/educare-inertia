import React from 'react';
import PersonalInfoCard from './PersonalInfoCard';

const StaffDetailsInnerLayout = ({staff, subjects}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <PersonalInfoCard staff={staff} subjects={subjects} />
                </div>
            </div>
        </div>
    );
};

export default StaffDetailsInnerLayout;