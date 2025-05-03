import React from 'react';
import EditSurveyForm from './EditSurveyForm';

const EditSurveyInnerLayout = ({
    surveyAudience,
    classNamesData,
    survey
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditSurveyForm
                        surveyAudience={surveyAudience}
                        classNamesData={classNamesData}
                        survey={survey}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditSurveyInnerLayout;
