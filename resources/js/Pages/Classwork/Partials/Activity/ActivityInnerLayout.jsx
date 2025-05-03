import React from 'react';
import Activity from './Activity';

const ActivityInnerLayout = ({assessment, students, classworkTypes, comments}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <Activity
                        assessment={assessment}
                        students={students}
                        classworkTypes={classworkTypes}
                        comments={comments}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityInnerLayout;
