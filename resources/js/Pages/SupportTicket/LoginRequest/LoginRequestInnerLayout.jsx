import React from 'react';
import LoginRequestForm from './LoginRequestForm';

const LoginRequestInnerLayout = ({classrooms, currentSchoolInfo}) => {
    return (
        <div className="educare-dashboard-main-content-wrap min-h-[calc(100vh-150px)]">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <LoginRequestForm classrooms={classrooms} currentSchoolInfo={currentSchoolInfo} />
                </div>
            </div>
        </div>
    );
};

export default LoginRequestInnerLayout;