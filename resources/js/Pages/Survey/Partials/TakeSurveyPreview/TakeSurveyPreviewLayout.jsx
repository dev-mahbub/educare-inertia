import React from 'react';
import TakeSurveyPreviewList from './TakeSurveyPreviewList';

const TakeSurveyPreviewLayout = ({ survey }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TakeSurveyPreviewList survey={survey} />
                </div>
            </div>
        </div>
    );
};

export default TakeSurveyPreviewLayout;
