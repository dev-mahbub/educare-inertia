import React from 'react';
import StudentSyllabusViewList from './StudentSyllabusViewList';
import StudentSyllabusViewFilter from './StudentSyllabusViewFilter';

const StudentViewInnerLayout = ({students, academicSyllabuses, studentId}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentSyllabusViewFilter students={students} academicSyllabuses={academicSyllabuses} studentId={studentId} />
                    <StudentSyllabusViewList academicSyllabuses={academicSyllabuses} />
                </div>
            </div>
        </div>
    );
};

export default StudentViewInnerLayout;
