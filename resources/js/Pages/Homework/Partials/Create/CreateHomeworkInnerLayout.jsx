import React from 'react';
import CreateHomeworkForm from './CreateHomeworkForm';

const CreateHomeworkInnerLayout = ({ subjects, classNames, classRoom, homeworkTypes }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateHomeworkForm
                        subjects={subjects}
                        classNames={classNames}
                        classRoom={classRoom}
                        homeworkTypes={homeworkTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateHomeworkInnerLayout;
