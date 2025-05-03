import React from 'react';
import StudentClassChart from "./StudentCharts/StudentClassChart";

const StudentClassGraph = ( { getClassroomsWithStudentCount } ) => {
    return (
        <div className="educare-chart-card bg-white rounded-lg pt-5 pb-2 px-2">
            <div className="educare-card-header mb-[20px] px-4">
                <h4 className='educare-chart-title'>Class-wise Students</h4>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="student-subject-wise-report-chart">
                <StudentClassChart getClassroomsWithStudentCount = {getClassroomsWithStudentCount}/>
            </div>
        </div>
    );
};

export default StudentClassGraph;