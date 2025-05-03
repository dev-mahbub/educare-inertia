import React from 'react';
import EditHomeworkForm from './EditHomeworkForm';

const EditHomeworkInnerLayout = ({ homeWork, subjects, classNames, classroomData, homeworkTypes }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditHomeworkForm
                        homeWork={homeWork}
                        subjects={subjects}
                        classNames={classNames}
                        homeworkTypes={homeworkTypes}
                        classroomData={classroomData}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditHomeworkInnerLayout;
