import React from 'react';
import CreateAssessmentForm from './CreateSurveyForm';

const SurveyInnerLayout = ({ surveyAudience, classNamesData }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateAssessmentForm
                        surveyAudience={surveyAudience}
                        classNamesData={classNamesData}
                    />
                </div>
            </div>
        </div>
    );
};

export default SurveyInnerLayout;
