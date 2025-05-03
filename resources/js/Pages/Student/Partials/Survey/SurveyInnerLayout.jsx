import React from 'react';
import StudentSurveyList from './StudentSurveyList';
import StudentSurveyFilter from './StudentSurveyFilter';

const SurveyInnerLayout = ({students, studentId, surveyList}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentSurveyFilter students={students} studentId={studentId}/>
                    <StudentSurveyList students={students} studentId={studentId} surveyList={surveyList}/>
                </div>
            </div>
        </div>
    );
};

export default SurveyInnerLayout;
