import React from 'react';
import SurveyFeedback from './SurveyFeedback';
import SurveyHeaderMenus from '@/Components/Partials/Menus/Survey/SurveyHeaderMenus';

const SurveyInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SurveyHeaderMenus title="Manage Feedback" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SurveyFeedback />
                </div>
            </div>
        </div>
    );
};

export default SurveyInnerLayout;