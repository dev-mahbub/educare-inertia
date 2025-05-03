import React from 'react';
import StudentParentsSupportTitle from './StudentParentsSupportTitle';
import StudentParentsSupportCategory from './StudentParentsSupportCategory';
import StudentParentsSupportArticle from './StudentParentsSupportArticle';

const StudentParentsSupportInnerLayout = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentParentsSupportTitle siteData={siteData} />
                    <StudentParentsSupportCategory />
                    <StudentParentsSupportArticle />
                </div>
            </div>
        </div>
    );
};

export default StudentParentsSupportInnerLayout;