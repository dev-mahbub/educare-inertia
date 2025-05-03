import React from 'react';
import AssessmentListFilter from './AssessmentListFilter';
import AssessmentList from './AssessmentList';

const AssessmentInnerLayout = ({ assessments, classrooms, subjects }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssessmentListFilter assessments={assessments} classrooms={classrooms} subjects={subjects} />
                    <AssessmentList assessments={assessments} />
                </div>
            </div>
        </div>
    );
};

export default AssessmentInnerLayout;
