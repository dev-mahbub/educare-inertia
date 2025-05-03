import React from 'react';
import StudentViewList from './StudentViewList';
import StudentViewFilter from './StudentViewFilter';
// import SearchBar from './SearchBar';

const StudentViewInnerLayout = ({students, studentId, homeWorks}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <SearchBar  /> */}
                    <StudentViewFilter students={students} homeWorks={homeWorks} />
                    <StudentViewList students={students} studentId={studentId} homeWorks={homeWorks} />
                </div>
            </div>
        </div>
    );
};

export default StudentViewInnerLayout;
