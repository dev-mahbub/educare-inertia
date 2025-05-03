import React from 'react';
import StudentViewList from './StudentViewList';
import StudentViewFilter from './StudentViewFilter';
// import SearchBar from './SearchBar';

const StudentViewInnerLayout = ({students, studentId, assessments}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <SearchBar  /> */}
                    <StudentViewFilter students={students} assessments={assessments} />
                    <StudentViewList students={students} studentId={studentId} assessments={assessments} />
                </div>
            </div>
        </div>
    );
};

export default StudentViewInnerLayout;
