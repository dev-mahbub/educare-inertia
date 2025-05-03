import React from 'react';
import PersonalInfoCard from './PersonalInfoCard';

const TeacherDetailsInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <PersonalInfoCard />
                </div>
            </div>
        </div>
    );
};

export default TeacherDetailsInnerLayout;