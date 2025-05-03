import React from 'react';
import CreateAssessmentForm from './CreateAssessmentForm';

const CreateAssessmentInnerLayout = ({ subjects, classNames, classRoom }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateAssessmentForm
                        subjects={subjects}
                        classNames={classNames}
                        classRoom={classRoom}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateAssessmentInnerLayout;
