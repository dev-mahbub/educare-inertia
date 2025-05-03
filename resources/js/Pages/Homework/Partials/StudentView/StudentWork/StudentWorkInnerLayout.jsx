import React from 'react';
import StudentWork from './StudentWork';

const StudentWorkInnerLayout = ({assessment, students, assessmentTypes, comments, studentId, teacherId}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentWork
                        assessment={assessment}
                        students={students}
                        assessmentTypes={assessmentTypes}
                        comments={comments}
                        studentId={studentId}
                        teacherId={teacherId}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentWorkInnerLayout;
