import React from 'react';
import TakeSurveyList from './TakeSurveyList';

const TakeSurveyLayout = ({survey}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TakeSurveyList survey={survey}/>
                </div>
            </div>
        </div>
    );
};

export default TakeSurveyLayout;