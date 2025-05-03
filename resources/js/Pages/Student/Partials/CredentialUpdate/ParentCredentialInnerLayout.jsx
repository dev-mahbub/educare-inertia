import React from 'react';
import ParentCredentialUpdateForm from './ParentCredentialUpdateForm';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';

const ParentCredentialInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ParentCredentialUpdateForm />
                </div>
            </div>
        </div>
    );
};

export default ParentCredentialInnerLayout;
