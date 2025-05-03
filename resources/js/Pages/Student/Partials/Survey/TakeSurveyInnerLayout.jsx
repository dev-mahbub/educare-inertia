import React from 'react';
import TakeSurveyList from './TakeSurveyList';
import StudentSurveyFilter from './StudentSurveyFilter';

const TakeSurveyInnerLayout = ({students, studentId, survey}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TakeSurveyList students={students} studentId={studentId} survey={survey}/>
                </div>
            </div>
        </div>
    );
};

export default TakeSurveyInnerLayout;