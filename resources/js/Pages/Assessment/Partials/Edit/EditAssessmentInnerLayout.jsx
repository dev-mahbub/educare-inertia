import React from 'react';
import CreateAssessmentForm from './EditAssessmentForm';

const EditAssessmentInnerLayout = ({ subjects, classNames, classRoom }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateAssessmentForm
                        subjects={subjects}
                        classNames={classNames}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAssessmentInnerLayout;
