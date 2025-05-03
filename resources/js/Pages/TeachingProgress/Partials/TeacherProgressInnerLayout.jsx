import React from 'react';
import TeacherOnlyTitleMenu from '@/Components/Partials/Header/TeacherOnlyTitleMenu';
import TeachingProgressForm from './TeachingProgressForm';

const TeacherProgressInnerLayout = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <TeacherOnlyTitleMenu title="Teaching Progress" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeachingProgressForm siteData={siteData} />
                </div>
            </div>
        </div>
    );
};

export default TeacherProgressInnerLayout;