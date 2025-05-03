import React from 'react';
import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import FollowDateWiseList from './FollowDateWiseList';
import FollowDateWiseFilter from './FollowDateWiseFilter';

const FollowDateWiseInnerLayout = ({ dateWiseReport }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FollowDateWiseFilter dateWiseReport = {dateWiseReport} />
                    <FollowDateWiseList dateWiseReport = {dateWiseReport} />
                </div>
            </div>
        </div>
    );
};

export default FollowDateWiseInnerLayout;