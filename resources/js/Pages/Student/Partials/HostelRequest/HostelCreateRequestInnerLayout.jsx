import React from 'react';
import HostelCreateForm from './HostelCreateForm';
import StudentCreateHostelRequestFilter from './StudentCreateHostelRequestFilter';

const HostelCreateRequestInnerLayout = ({students, studentId, hostelTypes}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <SearchBar  /> */}
                    <StudentCreateHostelRequestFilter students={students} studentId={studentId}/>
                    <HostelCreateForm students={students} studentId={studentId} hostelTypes={hostelTypes}/>
                </div>
            </div>
        </div>
    );
};

export default HostelCreateRequestInnerLayout;
