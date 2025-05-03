import React from 'react';
import StudentViewList from './StudentViewList';
import StudentViewFilter from './StudentViewFilter';
// import SearchBar from './SearchBar';

const StudentViewInnerLayout = ({students, studentId, classWorks}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <SearchBar  /> */}
                    <StudentViewFilter students={students} classWorks={classWorks} />
                    <StudentViewList students={students} studentId={studentId} classWorks={classWorks} />
                </div>
            </div>
        </div>
    );
};

export default StudentViewInnerLayout;
