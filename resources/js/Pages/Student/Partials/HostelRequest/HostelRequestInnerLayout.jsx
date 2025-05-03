import React from 'react';
import StudentHostelRequestList from './StudentHostelRequestList';
import StudentHostelRequestFilter from './StudentHostelRequestFilter';

const HostelRequestInnerLayout = ({students, studentId, hostelRequests}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <SearchBar  /> */}
                    <StudentHostelRequestFilter students={students} studentId={studentId}/>
                    <StudentHostelRequestList students={students} studentId={studentId} hostelRequests={hostelRequests}/>
                </div>
            </div>
        </div>
    );
};

export default HostelRequestInnerLayout;
