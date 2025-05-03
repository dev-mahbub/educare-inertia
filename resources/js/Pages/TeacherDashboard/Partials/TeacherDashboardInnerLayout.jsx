import React from 'react';
import TeacherOnlyTitleMenu from '@/Components/Partials/Header/TeacherOnlyTitleMenu';
import TeacherDashboardCategoryList from './TeacherDashboardCategoryList';

const TeacherDashboardInnerLayout = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <TeacherOnlyTitleMenu title="Manage Students" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherDashboardCategoryList siteData={siteData} />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardInnerLayout;